import { HttpException, HttpStatus, Injectable, HttpCode } from '@nestjs/common';
import { Store } from '@app/models/store.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { storeInterface } from '@app/helpers/interfaces/store';
// import { AddressService } from '../address/address.service';
import { pagingQueryType } from '@app/helpers/types/common';
import { isValidString } from '@app/utils/string';
// import { Address } from '@app/models/address.schema';
// import { addressInterface } from '@app/helpers/interfaces/address';
import { Observable } from 'rxjs';
import { createStoreDto } from './store.dto';
const toObjectId = Types.ObjectId;
@Injectable()
export class StoreService {
  constructor(@InjectModel(Store.name) private storeModel: Model<Store>) {}
  async build(model: createStoreDto) {
    const {
      name,
      email,
      bank_details,
      address,
      mode,
      opening_closing,
      contact_number,
      description,
      owner,
      website,
      location,
    } = model;

    const store = await new this.storeModel({
      name,
      email,
      contact_number,
      description,
      owner,
      mode,
      website,
      bank_details: bank_details,
      address: address,
      opening_closing,
      location,
    }).save();

    return store;
  }

  async createStore(model): Promise<any> {
    const isExist = await this.storeModel.findOne({
      owner: model.owner,
      name: model.name,
    });

    if (isExist) {
      throw new HttpException(`You already created, named with ${model.name}`, HttpStatus.BAD_REQUEST);
    }

    const data = await this.build(model);
    return data;
  }

  async getAll(id: string, query): Promise<Store[]> {
    let { page_no = '1', page_size = '50' } = query;

    page_no = Number(page_no);
    page_size = Number(page_size);

    const skip = (page_no - 1) * page_size;

    const data = await this.storeModel.aggregate([
      {
        $match: {
          $and: [
            { mode: new Types.ObjectId(id) },
            {
              is_deleted: false,
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'menus',
          let: { storeId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$storeId', '$store'],
                },
              },
            },
            {
              $lookup: {
                from: 'items',
                localField: '_id',
                foreignField: 'menu',
                as: 'items',
              },
            },
          ],
          as: 'menus',
        },
      },
      {
        $unwind: {
          path: '$menus',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'orders',
          let: { storeId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$storeId', '$restaurant_id'],
                },
              },
            },
            {
              $lookup: {
                from: 'customers',
                localField: 'customer_id',
                foreignField: '_id',
                as: 'customer_id',
              },
            },
            { $unwind: { path: '$customer_id', preserveNullAndEmptyArrays: true } },
            {
              $lookup: {
                from: 'users',
                localField: 'customer_id.user',
                foreignField: '_id',
                as: 'customer_id.user',
              },
            },
            { $unwind: { path: '$customer_id.user', preserveNullAndEmptyArrays: true } },
            {
              $lookup: {
                from: 'drivers',
                localField: 'driver_id',
                foreignField: '_id',
                as: 'driver_id',
              },
            },
            { $unwind: { path: '$driver_id', preserveNullAndEmptyArrays: true } },
            {
              $lookup: {
                from: 'users',
                localField: 'driver_id.user',
                foreignField: '_id',
                as: 'driver_id.user',
              },
            },
            { $unwind: { path: '$driver_id.user', preserveNullAndEmptyArrays: true } },
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
      {
        $skip: skip,
      },
      {
        $limit: Number(page_size),
      },
    ]);

    return data;
  }

  async remove<T>(id: T): Promise<string> {
    const store = await this.storeModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          is_deleted: true,
        },
      },
    );

    if (!store) {
      throw new HttpException(`store not found`, HttpStatus.BAD_REQUEST);
    }
    return 'store deleted';
  }

  async getById(id: string): Promise<Store | Observable<any | Store>> {
    const [store] = await this.storeModel.aggregate([
      {
        $match: { _id: new toObjectId(id) },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'owner',
        },
      },
      {
        $lookup: {
          from: 'menus',
          let: { storeId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$storeId', '$store'],
                },
              },
            },
            {
              $lookup: {
                from: 'items',
                localField: '_id',
                foreignField: 'menu',
                as: 'items',
              },
            },
          ],
          as: 'menus',
        },
      },
      {
        $lookup: {
          from: 'orders',
          let: { storeId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$storeId', '$restaurant_id'],
                },
              },
            },
            {
              $lookup: {
                from: 'users',
                localField: 'customer_id',
                foreignField: '_id',
                as: 'customer_id',
              },
            },
            { $unwind: { path: '$customer_id', preserveNullAndEmptyArrays: true } },
            {
              $lookup: {
                from: 'customers',
                let: { customerId: '$customer_id._id' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ['$$customerId', '$user'],
                      },
                    },
                  },
                  {
                    $lookup: {
                      from: 'addresses',
                      localField: 'address',
                      foreignField: '_id',
                      as: 'address',
                    },
                  },
                  { $unwind: { path: '$address', preserveNullAndEmptyArrays: true } },
                ],
                as: 'customer',
              },
            },
            { $unwind: { path: '$customer', preserveNullAndEmptyArrays: true } },
            {
              $lookup: {
                from: 'users',
                localField: 'driver_id',
                foreignField: '_id',
                as: 'driver_id',
              },
            },
            { $unwind: { path: '$driver_id', preserveNullAndEmptyArrays: true } },
            {
              $lookup: {
                from: 'drivers',
                let: { driverId: '$driver_id._id' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ['$$driverId', '$user'],
                      },
                    },
                  },
                  {
                    $lookup: {
                      from: 'addresses',
                      localField: 'address',
                      foreignField: '_id',
                      as: 'address',
                    },
                  },
                  { $unwind: { path: '$address', preserveNullAndEmptyArrays: true } },
                ],
                as: 'driver',
              },
            },
            { $unwind: { path: '$driver', preserveNullAndEmptyArrays: true } },
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
      {
        $unwind: {
          path: '$menus',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    return store;
  }

  async update<U, T extends Partial<storeInterface>>(id: U, model: T): Promise<Store | Observable<Store | any>> {
    const store = await this.storeModel.findById(id);

    if (!store) {
      throw new HttpException(`store not found`, HttpStatus.BAD_REQUEST);
    }

    if (isValidString(model.name)) {
      store.name = model.name;
    }
    if (isValidString(model.email)) {
      store.email = model.email;
    }
    if (isValidString(model.contact_number)) {
      store.contact_number = model.contact_number;
    }
    if (isValidString(model.description)) {
      store.description = model.description;
    }
    if (model.delivery_radius) {
      store.delivery_radius = model.delivery_radius;
    }
    if (model.opening_closing) {
      store.opening_closing = model.opening_closing;
    }
    if (model.address) {
      store.address = model.address;
    }
    if (model.location) {
      model.location['type'] = 'Point';
      store.location = model.location;
    }
    if (isValidString(model.website)) {
      store.website = model.website;
    }
    if (model.is_activated) {
      store.is_activated = model.is_activated;
    }

    if (isValidString(model.note)) {
      store.note = model.note;
    }
    if (isValidString(model.admin_note)) {
      store.admin_note = model.admin_note;
    }

    store.updated_at = new Date();

    await store.save();

    return store;
  }

  async uploadImage<T extends string, U extends Express.Multer.File>(id: T, file: U): Promise<string> {
    const store = await this.storeModel.findById({ _id: id });

    if (!store) {
      throw new HttpException(`store not found`, HttpStatus.BAD_REQUEST);
    }

    store.avatar = file.filename;
    await store.save();
    return 'image upload';
  }
}
