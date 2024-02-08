import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Addon } from '../../models/addon.schema';
// import { createAddonDto } from './addon.dto';
// import { isValidString } from '@app/utils/string';
import { addonInterface } from '@app/helpers/interfaces/addon';
import { Observable } from 'rxjs';
import { genrateFileName } from '@app/utils/file';
import { join } from 'path';
import { addonFilterDto } from './addon.dto';
import * as moment from 'moment';
const toObjectId = Types.ObjectId;
@Injectable()
export class AddonService {
  constructor(@InjectModel(Addon.name) private addonModel: Model<Addon>) {}

  // ""
  async create<T extends addonInterface>(files, model: T): Promise<Addon | Observable<Addon | T>> {
    let { addon } = model;
    const { itemId, mode } = model;

    addon && (addon = JSON.parse(addon.toString()));
    // ""
    //   async build(files, model: addonInterface) {
    // const { item, name, description, is_activated, price } = model;
    // ""

    const [image] = files.image;
    const imageFilename = image.filename;

    // ""
    //     const data = await new this.addonModel({
    //       itemId,
    //       addon,
    //       mode,
    // ""
    const data = await new this.addonModel({
      itemId,
      mode,
      addon,
      image: imageFilename,
    }).save();
    return data;
  }

  async createMany<T extends addonInterface[]>(addonArr: T): Promise<any> {
    const mappCallback = add => {
      return new this.addonModel({
        itemId: add.itemId,
        mode: add.mode,
        addon: add.addon,
        image: add.image,
      }).save();
    };

    const mapperData = [...addonArr].map(mappCallback);

    const allAddon = await Promise.all(mapperData);

    return allAddon;
  }

  async build(files, model): Promise<Addon> {
    let { addon } = model;
    const { itemId, mode } = model;

    addon && (addon = JSON.parse(addon.toString()));

    const [image] = files.image;
    const imageFilename = image.filename;

    const data = await new this.addonModel({
      itemId,
      addon,
      mode,
      image: imageFilename,
    }).save();
    return data;
  }

  async createAddon(files, model): Promise<Addon | Observable<Addon>> {
    const addon = await this.build(files, model);
    return addon;
  }

  async getAllAddon(id: string, queryParams): Promise<Addon[]> {
    let { page_number = '1', page_size = '50' } = queryParams;
    page_number = Number(page_number);

    page_size = Number(page_size);
    const skip = (page_number - 1) * page_size;

    const addon = await this.addonModel.aggregate([
      {
        $match: {
          $and: [
            { mode: new toObjectId(id) },
            {
              is_deleted: false,
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'modes',
          localField: 'mode',
          foreignField: '_id',
          as: 'mode',
        },
      },
      {
        $lookup: {
          from: 'items',
          localField: 'itemId',
          foreignField: '_id',
          as: 'itemId',
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: page_size,
      },
    ]);
    return addon;
  }
  async getByIdAddon<T>(id: T): Promise<Addon | Observable<Addon | null>> {
    const addon = (await this.addonModel.findById({ _id: id })).populate('itemId');
    return addon;
  }

  async updateAddon<T>(id: T | string, model: Partial<addonInterface>): Promise<Addon | Observable<any | Addon>> {
    const addon = await this.addonModel.findByIdAndUpdate({ _id: id });
    if (!addon) {
      throw new HttpException('addon not found', HttpStatus.BAD_REQUEST);
    }
    if (model.addon) {
      addon.addon = model.addon;
    }

    await addon.save();
    return addon;
  }

  // async deleteAddon<T>(id: T) {
  //   const addon = await this.addonModel.findById({ _id: id });
  //   if (!addon) {
  //     throw new HttpException('addon not found', HttpStatus.BAD_REQUEST);
  //   }

  //   addon.is_deleted = true;

  //   await addon.save();
  //   return addon;
  // }
  async searchAddon(name): Promise<Addon[] | Observable<Addon[]>> {
    const customer = await this.addonModel.aggregate([
      {
        $match: {
          is_deleted: false,
          'addon.itemName': {
            $regex: `.*${name}.*`,
            $options: 'i',
          },
        },
      },
      {
        $lookup: {
          from: 'items',
          localField: 'itemId',
          foreignField: '_id',
          as: 'itemId',
        },
      },
    ]);
    return customer;
  }

  async filterAddon<T extends Partial<addonFilterDto>>(query: T): Promise<Addon[]> {
    const is_active = JSON.parse(query.is_active as string);
    const is_inactive = JSON.parse(query.is_inactive as string);

    const pipeline = [
      {
        $match: {
          is_deleted: false,
        },
      },
    ];

    const matchQuery = {
      $match: { $or: [] },
    };

    if (is_active) {
      matchQuery['$match']['$or'].push({ is_activated: true });
    }

    if (is_inactive) {
      matchQuery['$match']['$or'].push({ is_activated: false });
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
          'addon.itemName': query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
        },
      };

      pipeline.push({ ...sorting } as any);
    }

    const data = await this.addonModel.aggregate(pipeline);
    return data;
  }

  // async createAddon(files, model: createAddonDto): Promise<Addon> {
  //   const addon = await this.build(files, model);
  //   return addon;
  // }

  // async getAllAddon(queryParams): Promise<Addon[]> {
  //   let { page_no = '1', page_size = '50' } = queryParams;

  //   page_no = Number(page_no);
  //   page_size = Number(page_size);

  //   const skip = (page_no - 1) * page_size;

  //   const addon = await this.addonModel.aggregate([
  //     {
  //       $match: {
  //         is_deleted: false,
  //       },
  //     },
  //     {
  //       $skip: skip,
  //     },
  //     {
  //       $limit: page_size,
  //     },
  //   ]);
  //   return addon;
  // }
  // async getByIdAddon<T>(id: T): Promise<Addon | Observable<Addon | null>> {
  //   const addon = await this.addonModel.findById({ _id: id });
  //   return addon;
  // }
  // async updateAddon<T>(id: T | string, model: Partial<addonInterface>): Promise<Addon | Observable<any | Addon>> {
  //   const addon = await this.addonModel.findByIdAndUpdate({ _id: id });
  //   if (!addon) {
  //     throw new HttpException('addon not found', HttpStatus.BAD_REQUEST);
  //   }

  //   if (isValidString(model.name)) {
  //     addon.name = model.name;
  //   }

  //   if (isValidString(model.description)) {
  //     addon.description = model.description;
  //   }

  //   if (model.price) {
  //     addon.price = model.price;
  //   }
  //   await addon.save();
  //   return addon;
  // }

  async deleteAddon<T>(id: T) {
    const addon = await this.addonModel.findById({ _id: id });
    if (!addon) {
      throw new HttpException('addon not found', HttpStatus.BAD_REQUEST);
    }

    addon.is_deleted = true;

    await addon.save();
    return addon;
  }
}
