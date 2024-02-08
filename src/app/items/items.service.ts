import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { createItemDto } from './items.dto';
import { Item } from '../../models/item.schema';
import { Observable } from 'rxjs';
import { iteminterface } from '../../helpers/interfaces/item';
import { isValidString } from '@app/utils/string';
import { addonInterface } from '@app/helpers/interfaces/addon';
import { Addon } from '@app/models/addon.schema';
import { AddonService } from '../addon/addon.service';
import { pagingQueryType } from '@app/helpers/types/common';
import * as moment from 'moment';
import { itemDtoFilter } from './items.dto';
import { pipeline } from 'stream';
const toObjectId = Types.ObjectId;
@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private itemModel: Model<Item>,
    @InjectModel(Addon.name) private addonModel: Model<Addon>,
    private addonService: AddonService,
  ) {}

  async build(files, model: createItemDto) {
    const { menu, mode, quantity, category, itemName, itemDsc, price, status, vegetarian_type } = model;

    // const { menu, category, itemName, itemDsc, price, status, vegetarian_type } = model;

    const [avatar] = files;

    // const [avatar] = files;
    const avatarFilename = avatar.filename;
    const item = await new this.itemModel({
      menu,
      category,
      mode,
      quantity,
      itemName,
      itemDsc,
      vegetarian_type,
      price,
      status,
      avatar: avatarFilename,
    }).save();
    return item;
  }

  async createItem(files, model, addon_images: Express.Multer.File[]): Promise<Item | Observable<Item>> {
    const item = await this.build(files, model);
    if (model.addon.length > 0) {
      const mappedAddon = JSON.parse(model.addon).map((add, i) => {
        return {
          item: item._id.toString(),
          // addon: add.addon,
          image: addon_images[i].filename,

          // async createItem(files, model) {
          //   const item = await this.build(files, model);

          // if (model.addon && model.addon.length > 0) {
          //   const mappedAddon = model.addon.map(add => {
          //     return {
          // item: item._id.toString(),
          name: add.name,
          description: add.description,
          price: add.price,
          is_activated: add.is_activated,
          // image: add.image,
        };
      });
      const addon_resp = await this.addonService.createMany<addonInterface[]>([...mappedAddon]);
      item['addon'] = [...addon_resp].map(doc => doc._id);
    }
    const data = await new this.itemModel(item).save();
    return data;
    // ""
    //     return item;
    // ""
  }

  // async getAll(id: string, query) {
  //   const { page_number, page_size } = query;
  //   const skip = ((+page_number - 1) * +page_size) as number;
  //   // const pipeline = [
  async getAll(id: string, query): Promise<Item[]> {
    let { page_no = '1', page_size = '50' } = query;

    page_no = Number(page_no);
    page_size = Number(page_size);

    const skip = (page_no - 1) * page_size;
    const data = await this.itemModel.aggregate([
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
        $match: {
          is_deleted: false,
        },
      },
      {
        $lookup: {
          from: 'addons',
          localField: 'addon',
          foreignField: '_id',
          as: 'addon',
        },
      },
      {
        $lookup: {
          from: 'menus',
          localField: 'menu',
          foreignField: '_id',
          as: 'menu',
        },
      },
      {
        $unwind: {
          path: '$menu',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'stores',
          localField: 'menu.store',
          foreignField: '_id',
          as: 'menu.store',
        },
      },
      {
        $unwind: {
          path: '$menu.store',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: Number(page_size),
      },
    ]);
    // const item = await this.addonModel.aggregate([...pipeline]);
    return data;
  }
  async getByIdMode(id: string): Promise<Item | Observable<any | Item>> {
    const [mode] = await this.itemModel.aggregate([
      {
        $match: {
          mode: new toObjectId(id),
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
          from: 'addons',
          localField: 'addon',
          foreignField: '_id',
          as: 'addon',
        },
      },
      {
        $lookup: {
          from: 'menus',
          localField: 'menu',
          foreignField: '_id',
          as: 'menu',
        },
      },
      {
        $unwind: {
          path: '$menu',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'stores',
          localField: 'menu.store',
          foreignField: '_id',
          as: 'menu.store',
        },
      },
      {
        $unwind: {
          path: '$menu.store',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
    ]);
    return mode;
  }
  async getByIdItem(id: string): Promise<Item | Observable<any | Item>> {
    const [item] = await this.itemModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(id) },
      },
      {
        $match: {
          is_deleted: false,
        },
      },
      {
        $lookup: {
          from: 'addons',
          localField: 'addon',
          foreignField: '_id',
          as: 'addon',
        },
      },
      {
        $lookup: {
          from: 'menus',
          localField: 'menu',
          foreignField: '_id',
          as: 'menu',
        },
      },
      {
        $unwind: {
          path: '$menu',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'stores',
          localField: 'menu.store',
          foreignField: '_id',
          as: 'menu.store',
        },
      },
      {
        $unwind: {
          path: '$menu.store',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
    ]);
    return item;
  }

  async updateItem<T>(id: T | string, model: Partial<iteminterface>): Promise<Item | Observable<any | Item>> {
    const item = await this.itemModel.findByIdAndUpdate({ _id: id });

    if (!item) {
      throw new HttpException('item not found', HttpStatus.BAD_REQUEST);
    }
    if (isValidString(model.itemName)) {
      item.itemName = model.itemName;
    }
    if (isValidString(model.itemDsc)) {
      item.itemDsc = model.itemDsc;
    }

    if (model.is_activated) {
      item.is_activated = model.is_activated;
    }

    if (isValidString(model.price)) {
      item.price = model.price;
    }
    if (isValidString(item.vegetarian_type)) {
      item.vegetarian_type = model.vegetarian_type;
    }
    if (isValidString(model.status)) {
      item.status = model.status;
    }
    if (isValidString(model.note)) {
      item.note = model.note;
    }
    if (isValidString(model.admin_note)) {
      item.admin_note = model.admin_note;
    }

    await item.save();
    return item;
  }

  async deleteItem(id: string): Promise<Item | Observable<any | Item>> {
    const item = await this.itemModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          is_deleted: true,
        },
      },
    );
    await item.save();
    return item;
  }

  async searchItem(name): Promise<Item[] | Observable<Item[]>> {
    const customer = await this.itemModel.aggregate([
      {
        $match: {
          is_deleted: false,
          itemName: {
            $regex: `.*${name}.*`,
            $options: 'i',
          },
        },
      },
      {
        $match: {
          is_deleted: false,
        },
      },
      {
        $lookup: {
          from: 'addons',
          localField: 'addon',
          foreignField: '_id',
          as: 'addon',
        },
      },
      {
        $lookup: {
          from: 'menus',
          localField: 'menu',
          foreignField: '_id',
          as: 'menu',
        },
      },
      {
        $unwind: {
          path: '$menu',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'stores',
          localField: 'menu.store',
          foreignField: '_id',
          as: 'menu.store',
        },
      },
      {
        $unwind: {
          path: '$menu.store',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
    ]);
    return customer;
  }
  async filterItem<T extends Partial<itemDtoFilter>>(query: T): Promise<Item[]> {
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
          itemName: query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
        },
      };

      pipeline.push({ ...sorting } as any);
    }

    const data = await this.itemModel.aggregate(pipeline);
    return data;
  }
  async uploadProfileImage<T extends string, U extends Express.Multer.File>(id: T, file: U): Promise<string> {
    const item = await this.itemModel.findById({ _id: id });
    if (!item) {
      throw new HttpException(`item not found`, HttpStatus.BAD_REQUEST);
    }
    item.avatar = file.filename;
    await item.save();
    return 'image upload';
  }
}
