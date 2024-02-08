import { HttpException, HttpStatus, Injectable, UseInterceptors } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Model, Types } from 'mongoose';
import { Customer } from '../../models/customer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../models/users.schema';
import { pagingQueryType } from 'src/helpers/types/common';
import { Observable, pipe } from 'rxjs';
import { isValidString } from '@app/utils/string';
import { createHash } from '@app/utils/bcrypt';
import { AddressService } from '../address/address.service';
import { addressInterface } from '@app/helpers/interfaces/address';
import { isAllvalidMongoObjectIds } from '@app/utils/validate';
import { userInterface } from '@app/helpers/interfaces/user.interface';
import { customerFilterType } from '@app/helpers/types/customer';
import * as moment from 'moment';
import { Address } from '@app/models/address.schema';
const toObjectId = Types.ObjectId;

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    @InjectModel(Address.name) private addressModel: Model<Address>,
    @InjectModel(User.name) private userModel: Model<User>,
    private addressService: AddressService,
    private userService: UsersService,
  ) {}

  async createCustomer(model) {
    const isExist = await this.userModel.findOne({
      email: model.email,
      role: 'customer',
      is_deleted: true,
    });

    if (isExist) {
      throw new HttpException('Customer already exist', HttpStatus.BAD_REQUEST);
    }

    model.password = createHash(model.password);
    model.role = 'customer';

    const user = await this.userService.build(model);

    const customer_payload = {
      user: user._id,
      mode: model.mode,
      note: model.note,
      admin_note: model.admin_note,
    };

    if (model.address && model.address.length > 0) {
      const mappedAddress = model.address.map(add => {
        return {
          type: add.type,
          user: user._id.toString(),
          // mode: model._id.toString(),
          is_activated: add.is_activated,
          country: add.country,
          state: add.state,
          city: add.city,
          address_line1: add.address_line1,
          address_line2: add.address_line2,
          zip_code: add.zip_code,
        };
      });

      const address_resp = await this.addressService.createMany<addressInterface[]>([...mappedAddress]);

      customer_payload['address'] = [...address_resp].map(doc => doc._id);
    }

    const customer = await new this.customerModel({ ...customer_payload }).save();

    return customer;
  }

  async getAllCustomer(id: string, query) {
    let { page_number = '1', page_size = '50' } = query;

    page_number = Number(page_number);

    page_size = Number(page_size);

    const skip = (page_number - 1) * page_size;

    const customers = await this.customerModel.aggregate([
      // {
      //   $match: {
      //     $and: [
      //       { mode: new toObjectId(id) },
      //       {
      //         is_deleted: false,
      //       },
      //     ],
      //   },
      // },
      {
        $match: {
          mode: new toObjectId(id),
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: page_size,
      },
      {
        $lookup: {
          from: 'addresses',
          localField: 'address',
          foreignField: '_id',
          as: 'address',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          'user.is_deleted': false,
        },
      },
      {
        $project: {
          'user.password': false,
          'user.device_token': false,
          'user.token': false,
        },
      },
      {
        $lookup: {
          from: 'orders',
          let: { customerId: '$user._id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$customerId', '$customer_id'],
                },
              },
            },
            {
              $lookup: {
                from: 'users',
                localField: 'driver_id',
                foreignField: '_id',
                as: 'driver_user',
              },
            },
            {
              $unwind: '$driver_user',
            },
            {
              $lookup: {
                from: 'drivers',
                localField: 'driver_user._id',
                foreignField: 'user',
                as: 'driver_user.driver',
              },
            },
            {
              $lookup: {
                from: 'stores',
                localField: 'restaurant_id',
                foreignField: '_id',
                as: 'restaurant_id',
              },
            },
            {
              $lookup: {
                from: 'items',
                localField: 'item_id',
                foreignField: '_id',
                as: 'item_id',
              },
            },
            { $unwind: { path: '$item_id', preserveNullAndEmptyArrays: true } },
          ],
          as: 'orders',
        },
      },
    ]);
    // const customers = await this.customerModel.aggregate([...pipeline]);
    return customers;
  }

  async getById(id: string): Promise<Customer | Observable<Customer | null>> {
    const [customer] = await this.customerModel.aggregate([
      {
        $match: { user: new toObjectId(id) },
      },

      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: 'addresses',
          localField: 'user._id',
          foreignField: 'user',
          as: 'address',
        },
      },
      {
        $match: {
          'user.is_deleted': false,
        },
      },
      {
        $lookup: {
          from: 'orders',
          let: { customerId: '$user._id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$customerId', '$customer_id'],
                },
              },
            },
            {
              $lookup: {
                from: 'users',
                localField: 'driver_id',
                foreignField: '_id',
                as: 'driver_user',
              },
            },
            {
              $unwind: '$driver_user',
            },
            {
              $lookup: {
                from: 'drivers',
                localField: 'driver_user._id',
                foreignField: 'user',
                as: 'driver_user.driver',
              },
            },
            {
              $lookup: {
                from: 'stores',
                localField: 'restaurant_id',
                foreignField: '_id',
                as: 'restaurant_id',
              },
            },
            {
              $lookup: {
                from: 'items',
                localField: 'item_id',
                foreignField: '_id',
                as: 'item_id',
              },
            },
            { $unwind: { path: '$item_id', preserveNullAndEmptyArrays: true } },
          ],
          as: 'orders',
        },
      },
    ]);
    return customer;
  }

  async updateCustomer<T>(id: T, model): Promise<string> {
    const [user, customer] = await Promise.all([this.userModel.findById(id), this.customerModel.findOne({ user: id })]);

    if (!user || !customer) {
      throw new HttpException('customer not found', HttpStatus.BAD_REQUEST);
    }

    await this.userService.updateUser<T>(id, model);

    if (isValidString(model.note)) {
      customer.note = model.note;
    }

    if (isValidString(model.admin_note)) {
      customer.admin_note = model.admin_note;
    }

    if (model.address && model.address.length > 0) {
      if (customer.address.length === 5) {
        throw new HttpException('you cannot add more than 5 address', HttpStatus.BAD_REQUEST);
      }
      const mappedAddress = model.address.map(add => ({
        type: add.type,
        user: user._id.toString(),
        is_activated: add.is_activated,
        country: add.country,
        state: add.state,
        city: add.city,
        address_line1: add.address_line1,
        address_line2: add.address_line2,
        zip_code: add.zip_code,
      }));

      const address_resp = await this.addressService.createMany<addressInterface[]>([...mappedAddress]);
      customer.address.push(...address_resp.map((doc: any) => doc._id.toString()));
    }
    await customer.save();

    return 'customer updated';
  }

  async remove<T>(id: T): Promise<string> {
    const user = await this.userModel.findById({ _id: id, role: 'customer' });

    if (!user) {
      throw new HttpException('customer not found', HttpStatus.BAD_REQUEST);
    }

    user.is_deleted = true;

    await user.save();

    return 'customer removed';
  }

  async removeManyCustomer<T extends string[]>(customer_ids: T): Promise<string> {
    const is_all_valid = isAllvalidMongoObjectIds(customer_ids);

    if (!is_all_valid) {
      throw new HttpException('Invalid ids', HttpStatus.BAD_REQUEST);
    }

    const updated = await this.userModel.updateMany(
      {
        _id: customer_ids,
      },
      {
        $set: {
          is_deleted: true,
        },
      },
      { multi: true },
    );

    if (!updated) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return 'customers removed';
  }

  async searchCustomer(name): Promise<Customer[] | Observable<Customer[]>> {
    const customer = await this.customerModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $match: {
          'user.is_deleted': false,
          'user.fullname': {
            $regex: `.*${name}.*`,
            $options: 'i',
          },
        },
      },
    ]);
    return customer;
  }

  async filterCustomer<T extends Partial<customerFilterType>>(query: T): Promise<Customer[]> {
    const is_active = JSON.parse(query.is_active as string);
    const is_inactive = JSON.parse(query.is_inactive as string);

    const pipeline = [
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $match: {
          'user.is_deleted': false,
        },
      },
    ];

    const matchQuery = {
      $match: { $or: [] },
    };

    if (is_active) {
      matchQuery['$match']['$or'].push({ 'user.is_activated': true });
    }

    if (is_inactive) {
      matchQuery['$match']['$or'].push({ 'user.is_activated': false });
    }

    if (is_active || is_inactive) {
      pipeline.push(matchQuery as any);
    }

    if (query.date_from && query.date_to) {
      const start_date = moment(query.date_from).startOf('days').toISOString();
      const end_date = moment(query.date_to).endOf('days').toISOString();

      const date_match = {
        $match: {
          $and: [{ created_at: { $gte: new Date(start_date) } }, { created_at: { $lte: new Date(end_date) } }],
        },
      } as Record<string, any>;

      pipeline.push(date_match as any);
    }

    if (query.sort_order) {
      const sorting = {
        $sort: {
          'user.fullname': query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
        },
      };

      pipeline.push({ ...sorting } as any);
    }

    const data = await this.customerModel.aggregate(pipeline);
    return data;
  }

  async updateAddress(id: string, model: Partial<addressInterface>): Promise<Partial<Address>> {
    const address = await this.addressModel.findById(id);

    if (!address) {
      throw new HttpException('Address not found', HttpStatus.BAD_REQUEST);
    }

    if (isValidString(model.address_line1)) {
      address.address_line1 = model.address_line1;
    }

    if (isValidString(model.address_line2)) {
      address.address_line2 = model.address_line2;
    }

    if (isValidString(model.state)) {
      address.state = model.state;
    }

    if (isValidString(model.city)) {
      address.city = model.city;
    }

    if (isValidString(model.zip_code)) {
      address.zip_code = model.zip_code;
    }

    if (isValidString(model.country)) {
      address.country = model.country;
    }

    address.updated_at = new Date();

    await address.save();

    return address;
  }

  // async deleteAddress(customerId: string, addressId: string): Promise<string> {
  //   const [customer] = await Promise.all([this.customerModel.findOne({ user: customerId })]);

  //   if (!customer) {
  //     throw new HttpException('customer not found', HttpStatus.BAD_REQUEST);
  //   }

  //   const address = await this.addressModel.findByIdAndDelete(addressId);

  //   if (!address) {
  //     throw new HttpException('address not found', HttpStatus.BAD_REQUEST);
  //   }

  //   customer.address = [...customer.address].filter(id => {
  //     return id.toString() !== address._id.toString();
  //   });

  //   await customer.save();

  //   return 'address removed';
  // }
}
