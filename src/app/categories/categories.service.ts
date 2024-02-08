import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../../models/category.schema';
import { createCategoryDto, categoryDtoFilter, updateCategoryDto } from './categories.dto';
// import { Observable, generate } from 'rxjs';
import { isValidString } from '@app/utils/string';
import { categoryinterface } from '../../helpers/interfaces/catagory';
import { unlink, unlinkSync, writeFileSync } from 'fs';
import { genrateFileName } from '@app/utils/file';
import { join } from 'path';
import * as moment from 'moment';
// import { pagingQueryType } from '@app/helpers/types/common';
import { Observable } from 'rxjs';
@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async build(files, model: createCategoryDto) {
    const { fullname, mode, description, note, admin_note, is_activated } = model;
    // console.log('test>>>>>>>>>>>>>>>>>');
    const [avatar] = files.avatar;

    const avatarFilename = avatar.filename;

    const category = await new this.categoryModel({
      fullname,
      description,
      avatar: avatarFilename,
      note,
      mode,
      admin_note,
      is_activated,
    }).save();
    return category;
  }

  async createCategory(files, model: createCategoryDto): Promise<Category> {
    // console.log('category create>>>>>>>>>>>>>>>...', files, model);
    const category = await this.build(files, model);
    return category;
  }

  async getAllCategory(id: string, queryParams): Promise<Category[]> {
    let { page_no = '1', page_size = '50' } = queryParams;

    page_no = Number(page_no);

    page_size = Number(page_size);

    const skip = (page_no - 1) * page_size;

    const category = await this.categoryModel.aggregate([
      {
        $match: {
          mode: new Types.ObjectId(id),
        },
      },
      {
        $match: {
          is_deleted: false,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: page_size,
      },
    ]);
    return category;
  }

  async getByIdCategory<T>(id: T): Promise<Category | Observable<Category | null>> {
    const category = await this.categoryModel.findById(id);
    return category;
  }

  async updateCategory<T>(
    id: T | string,
    model: Partial<categoryinterface>,
  ): Promise<Category | Observable<any | Category>> {
    const category = await this.categoryModel.findByIdAndUpdate({ _id: id });
    if (!category) {
      throw new HttpException('category not found', HttpStatus.BAD_REQUEST);
    }

    if (isValidString(model.fullname)) {
      category.fullname = model.fullname;
    }

    if (isValidString(model.description)) {
      category.description = model.description;
    }

    if (model.is_activated) {
      category.is_activated = model.is_activated;
    }

    if (isValidString(model.note)) {
      category.note = model.note;
    }

    if (isValidString(model.admin_note)) {
      category.admin_note = model.admin_note;
    }

    await category.save();
    return category;
  }

  async uploadProfileImage<T extends string, U extends Express.Multer.File>(id: T, file: U): Promise<string> {
    const category = await this.categoryModel.findById({ _id: id });
    if (!category) {
      throw new HttpException(`category not found`, HttpStatus.BAD_REQUEST);
    }

    category.avatar = file.filename;
    await category.save();
    return 'image upload';
  }

  async categoryDelete<T>(id: T): Promise<string> {
    const category = await this.categoryModel.findById({ _id: id });
    if (!category) {
      throw new HttpException('category not found', HttpStatus.BAD_REQUEST);
    }
    category.is_deleted = true;

    await category.save();
    return 'category remove';
  }
  async searchCategory(name): Promise<Category[] | Observable<Category[]>> {
    const customer = await this.categoryModel.aggregate([
      {
        $match: {
          is_deleted: false,
          fullname: {
            $regex: `.*${name}.*`,
            $options: 'i',
          },
        },
      },
    ]);
    return customer;
  }
  async filterCategory<T extends Partial<categoryDtoFilter>>(query: T): Promise<Category[]> {
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
          fullname: query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
        },
      };

      pipeline.push({ ...sorting } as any);
    }

    const data = await this.categoryModel.aggregate(pipeline);
    return data;
  }
}
