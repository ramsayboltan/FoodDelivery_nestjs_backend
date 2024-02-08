import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
// import { createDriverDto } from './drivers.dto';
import { Driver } from '../../models/drivers.schema';
import { User } from '../../models/users.schema';
import { AddressService } from '../address/address.service';
import { Observable } from 'rxjs';
import { driverFilterDto } from './drivers.dto';
import { isValidString } from 'src/utils/string';
import { pagingQueryType } from 'src/helpers/types/common';
import { uploadProfileImage } from 'src/helpers/types/driver';
import { createHash } from '@app/utils/bcrypt';
import { isAllvalidMongoObjectIds } from '@app/utils/validate';
import { Address } from '@app/models/address.schema';
import { addressInterface } from '@app/helpers/interfaces/address';
import { driverInterface } from '@app/helpers/interfaces/driver';
import * as moment from 'moment';
import { genrateFileName } from '@app/utils/file';
import { writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { filterType } from '@app/helpers/types/driver';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
const toObjectId = Types.ObjectId;
// import { DocumentFileType } from '@app/helpers/interfaces/driver';

// import { documentFileType } from '@app/helpers/types/driver';

@Injectable()
export class DriversService {
  constructor(
    @InjectModel(Driver.name) private driverModel: Model<Driver>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Address.name) private addressModel: Model<Address>,
    private addressService: AddressService,
    private userService: UsersService,
  ) {}

  async build(files, model): Promise<Driver> {
    let { statics, vehicle_details, driver_criteria, bank_details } = model;
    const { user, mode, admin_note, note, address } = model;

    statics && (statics = JSON.parse(statics as string));
    bank_details && (bank_details = JSON.parse(bank_details.toString()));
    vehicle_details && (vehicle_details = JSON.parse(vehicle_details.toString()));
    driver_criteria && (driver_criteria = JSON.parse(driver_criteria as string));

    const [rc__file] = files.rc_image;
    const [govt_id_file] = files.govt_id_image;
    const [liscense_file] = files.liscense_image;
    const [verified_picture_file] = files.verified_picture;

    const documents = {
      rc_image: rc__file.filename,
      liscense_image: liscense_file.filename,
      govt_id_image: govt_id_file.filename,
      verified_picture: verified_picture_file.filename,
    };

    const driver = await new this.driverModel({
      user,
      statics,
      vehicle_details,
      bank_details,
      documents,
      mode,
      driver_criteria,
      admin_note,
      note,
      address,
    }).save();
    return driver;
  }

  async createDriver(files, model): Promise<Driver | Observable<Driver>> {
    const isExist = await this.userModel.findOne({
      email: model.email,
      role: 'driver',
      is_deleted: true,
    });

    if (isExist) {
      throw new HttpException('driver already exist', HttpStatus.BAD_REQUEST);
    }

    model.password = createHash(model.password);
    model.role = 'driver';
    const user = await this.userService.build(model);

    const driver_payload = {
      user: user._id,
      note: model.note,
      admin_note: model.admin_note,
      statics: model.statics,
      vehicle_details: model.vehicle_details,
      bank_details: model.bank_details,
      documents: model.documents,
      driver_criteria: model.driver_criteria,
    };

    if (model.address && model.address.length > 0) {
      const mappedAddress = (JSON.parse(model.address) as any[]).map(add => {
        return {
          type: add.type,
          user: user._id.toString(),
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

      driver_payload['address'] = [...address_resp].map(doc => doc._id);
    }

    const driver = await this.build(files, { ...driver_payload });
    return driver;
  }

  // If you need further clarification or have any specific questions, feel free to ask!
  async getAllDrivers(id: string, query) {
    let { page_number = '1', page_size = '50' } = query;

    page_number = Number(page_number);
    page_size = Number(page_size);
    const skip = (page_number - 1) * page_size;

    const pipeline = [
      {
        $match: {
          mode: new Types.ObjectId(id),
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
        $lookup: {
          from: 'addresses',
          localField: 'user._id',
          foreignField: 'user',
          as: 'address',
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
          let: { driverId: '$user._id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$driverId', '$driver_id'],
                },
              },
            },
            {
              $lookup: {
                from: 'users',
                localField: 'customer_id',
                foreignField: '_id',
                as: 'customer_user',
              },
            },
            {
              $unwind: '$customer_user',
            },
            {
              $lookup: {
                from: 'customers',
                localField: 'customer_user._id',
                foreignField: 'user',
                as: 'customer_user.customer',
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
    ];

    const drivers = await this.driverModel.aggregate([...pipeline]);
    return drivers;
  }
  async getByIdDriver(id: string): Promise<Driver | Observable<Driver | null>> {
    const [driver] = await this.driverModel.aggregate([
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
          let: { driverId: '$user._id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$driverId', '$driver_id'],
                },
              },
            },
            {
              $lookup: {
                from: 'users',
                localField: 'customer_id',
                foreignField: '_id',
                as: 'customer_user',
              },
            },
            {
              $unwind: '$customer_user',
            },
            {
              $lookup: {
                from: 'customers',
                localField: 'customer_user._id',
                foreignField: 'user',
                as: 'customer_user.customer',
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
    return driver;
  }

  async updateDriver<T>(id: T, model): Promise<string> {
    const [user, driver] = await Promise.all([this.userModel.findById(id), this.driverModel.findOne({ user: id })]);

    if (!user || !driver) {
      throw new HttpException('Driver not found', HttpStatus.BAD_REQUEST);
    }
    await this.userService.updateUser<T>(id, model);

    if (model.bank_details) {
      driver.bank_details = model.bank_details;
    }

    if (model.statics) {
      driver.statics = model.statics;
    }

    if (model.driver_criteria) {
      driver.driver_criteria = model.driver_criteria;
    }

    if (model.vehicle_details) {
      driver.vehicle_details = model.vehicle_details;
    }

    if (isValidString(model.note)) {
      driver.note = model.note;
    }

    if (isValidString(model.admin_note)) {
      driver.admin_note = model.admin_note;
    }

    if (model.address && model.address.length > 0) {
      if (driver.address.length === 5) {
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
      driver.address.push(...address_resp.map((doc: any) => doc._id.toString()));
    }

    await driver.save();

    return 'driver updated';
  }

  async deleteDriver<T>(id: T): Promise<string> {
    const user = await this.userModel.findById({ _id: id, role: 'user' });
    if (!user) {
      throw new HttpException('driver not found', HttpStatus.BAD_REQUEST);
    }
    user.is_deleted = true;
    await user.save();
    return 'user removed';
  }

  async searchDriver(searchValue: string): Promise<Driver[] | Observable<Driver[]>> {
    const driver = await this.driverModel.aggregate([
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
          $or: [
            {
              'user.fullname': {
                $regex: `.*${searchValue}.*`,
                $options: 'i',
              },
            },
            {
              'user.email': {
                $regex: `.*${searchValue}.*`,
                $options: 'i',
              },
            },
          ],
        },
      },
    ]);
    return driver;
  }

  async uploadProfileImage<T extends string>(id: T, files: uploadProfileImage): Promise<string> {
    try {
      const user = await this.userModel.findByIdAndUpdate(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }

      const driver = await this.driverModel.findOne({ user: id });
      if (!driver) {
        throw new HttpException('Driver not found', HttpStatus.BAD_REQUEST);
      }
      driver.documents = {
        ...driver.documents,
        rc_image: files.rc_image[0].filename,
        govt_id_image: files.govt_id_image[0].filename,
        liscense_image: files.liscense_image[0].filename,
        verified_picture: files.verified_picture[0].filename,
      };

      await driver.save();

      return 'Image upload successful';
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async driverFilter<T extends Partial<filterType>>(query: T): Promise<Driver[]> {
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
      $match: { $and: [] },
    };
    if (is_active) {
      matchQuery['$match']['$and'].push({ 'user.is_activated': true });
    }
    if (is_inactive) {
      matchQuery['$match']['$and'].push({ 'user.is_activated': false });
    }

    if (is_active || is_inactive) {
      pipeline.push(matchQuery as any);
    }

    // if (query.date_from && query.date_to) {
    //   const start_date = moment(query.date_from).startOf('days').toISOString();
    //   const end_date = moment(query.date_to).endOf('days').toISOString();

    //   const date_match = {
    //     $match: {
    //       $and: [{ created_at: { $gte: new Date(start_date) } }, { created_at: { $lte: new Date(end_date) } }],
    //     },
    //   } as Record<string, any>;
    //   pipeline.push(date_match as any);
    // }
    if (query.sort_order) {
      const sorting = {
        $sort: {
          'user.fullname': query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
        },
      };
      pipeline.push({ ...sorting } as any);
    }

    if (query.sort_order) {
      const sorting = {
        $sort: {
          by_earning: query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
        },
      };
      pipeline.push({ ...sorting } as any);
    }

    if (query.sort_order) {
      const sorting = {
        $sort: {
          by_rating: query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
        },
      };
      pipeline.push({ ...sorting } as any);
    }

    if (query.sort_order) {
      const sorting = {
        $sort: {
          by_riding: query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
        },
      };
      pipeline.push({ ...sorting } as any);
    }

    const data = await this.driverModel.aggregate([...pipeline]);
    return data;
  }
}
