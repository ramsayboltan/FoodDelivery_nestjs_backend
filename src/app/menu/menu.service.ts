import { HttpException, HttpStatus, Injectable, UseInterceptors } from '@nestjs/common';
import { Model } from 'mongoose';
import { Menu } from '../../models/menu.schema';
import { InjectModel } from '@nestjs/mongoose';
import { PagingQueryDto, createMenuDto } from './menu.dto';
import { isValidString } from '@app/utils/string';
import { menuinterface } from '@app/helpers/interfaces/menu';
import { Observable } from 'rxjs';
import { Store } from '../../models/store.schema';
import { StoreService } from '../store/store.service';
import { Types } from 'mongoose';

const ObjectId = Types.ObjectId;
@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu.name) private menuModel: Model<Menu>,
    @InjectModel(Store.name) private storeModel: Model<Store>,

    private storeService: StoreService,
  ) {}

  // async build(menuData: Partial<Menu>) {
  //   const menu = await new this.menuModel(menuData).save();
  //   return menu;
  // }

  async createMenu(model: createMenuDto) {
    const existingStore = await this.storeModel.findOne({
      is_deleted: false,
    });
    console.log(existingStore);
    if (!existingStore) {
      throw new HttpException('Store does not exist', HttpStatus.BAD_REQUEST);
    }
    const menu_payload = {
      store: new ObjectId(model.store),
      mode: new ObjectId(model.mode),
      name: model.name,
      note: model.note,
      admin_note: model.admin_note,
      description: model.description,
    };

    const menu = await new this.menuModel(menu_payload).save();
    return menu;
  }

  async getAllMenu(id: string, queryParams): Promise<Menu[]> {
    let { page_no = '1', page_size = '50' } = queryParams;

    page_no = Number(page_no);
    page_size = Number(page_size);

    const skip = (page_no - 1) * page_size;

    const menu = await this.menuModel.aggregate([
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
          from: 'stores',
          localField: 'store',
          foreignField: '_id',
          as: 'store',
        },
      },

      {
        $unwind: '$store',
      },

      {
        $skip: skip,
      },

      {
        $limit: page_size,
      },
    ]);
    return menu;
  }
  async getByIdMenu(id: string): Promise<Menu[]> {
    const [menu] = await this.menuModel.aggregate([
      {
        $match: { $and: [{ _id: new Types.ObjectId(id) }, { is_deleted: false }] },
      },
      {
        $lookup: {
          from: 'stores',
          localField: 'store',
          foreignField: '_id',
          as: 'store',
        },
      },
      {
        $unwind: '$store',
      },
    ]);

    return menu;
  }

  async updateMenu<T>(id: T | string, model: Partial<menuinterface>): Promise<Menu | Observable<any | Menu>> {
    const menu = await this.menuModel.findByIdAndUpdate({ _id: id });
    if (!menu) {
      throw new HttpException('menu not found', HttpStatus.BAD_REQUEST);
    }

    if (isValidString(model.name)) {
      menu.name = model.name;
    }

    if (isValidString(model.description)) {
      menu.description = model.description;
    }

    if (isValidString(model.note)) {
      menu.note = model.note;
    }

    if (isValidString(model.admin_note)) {
      menu.admin_note = model.admin_note;
    }
    await menu.save();
    return menu;
  }

  async deleteMenu<T>(id: T): Promise<string> {
    const menu = await this.menuModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          is_deleted: true,
        },
      },
    );

    if (!menu) {
      throw new HttpException(`menu not found`, HttpStatus.BAD_REQUEST);
    }
    return 'menu deleted';
  }
}
