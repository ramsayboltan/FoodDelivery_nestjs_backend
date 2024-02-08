import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { subCategory } from '@app/models/subcategory.Schema';
import { SubCategoryDto, updateSubCategory } from './sub-category.dto';
import { Observable } from 'rxjs';
import { isValidString } from '@app/utils/string';
import { subInterface } from '../../helpers/interfaces/subinterface';

@Injectable()
export class SubCategoryService {
  constructor(@InjectModel(subCategory.name) private subCategoryModel: Model<subCategory>) {}

  async build(files, model: SubCategoryDto) {
    const { name, mode, description, is_activated, note, admin_note } = model;
    const [image] = files.image;
    const imageFilename = image.filename;

    const subCategory = await new this.subCategoryModel({
      name,
      description,
      note,
      mode,
      admin_note,
      is_activated,
      image: imageFilename,
    }).save();
    return subCategory;
  }

  async createSub(files, model: SubCategoryDto): Promise<subCategory> {
    const sub = await this.build(files, model);

    return sub;
  }

  async getAllSub(queryParams): Promise<subCategory[]> {
    let { page_no = '1', page_size = '50' } = queryParams;

    page_no = Number(page_no);
    page_size = Number(page_size);

    const skip = (page_no - 1) * page_size;
    const sub = await this.subCategoryModel.aggregate([
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
    return sub;
  }

  async getByIdSub<T>(id: T): Promise<subCategory | Observable<subCategory | null>> {
    const sub = await this.subCategoryModel.findById(id);
    return sub;
  }

  async updateSub<T>(
    id: T | string,

    model: Partial<subInterface>,
  ): Promise<subCategory | Observable<any | subCategory>> {
    const sub = await this.subCategoryModel.findByIdAndUpdate({ _id: id });

    if (!sub) {
      throw new HttpException('subcategory not found', HttpStatus.BAD_REQUEST);
    }

    if (isValidString(model.name)) {
      sub.name = model.name;
    }

    if (isValidString(model.description)) {
      sub.description = model.description;
    }

    if (isValidString(model.note)) {
      sub.note = model.note;
    }

    if (isValidString(model.admin_note)) {
      sub.admin_note = model.admin_note;
    }

    await sub.save();
    return sub;
  }

  async deleteSub<T>(id: T): Promise<string> {
    const sub = await this.subCategoryModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          is_deleted: true,
        },
      },
    );

    if (!sub) {
      throw new HttpException(`subCategory not found`, HttpStatus.BAD_REQUEST);
    }
    return 'subCategory deleted';
  }

  async updateSC<T>(
    id: T | string,
    files: any,

    model: Partial<subInterface>,
  ): Promise<subCategory | Observable<any | subCategory>> {
    const sub = await this.subCategoryModel.findByIdAndUpdate({ _id: id });

    if (!sub) {
      throw new HttpException('subcategory not found', HttpStatus.BAD_REQUEST);
    }

    if (isValidString(model.name)) {
      sub.name = model.name;
    }

    if (isValidString(model.description)) {
      sub.description = model.description;
    }

    if (isValidString(model.note)) {
      sub.note = model.note;
    }

    if (isValidString(model.admin_note)) {
      sub.admin_note = model.admin_note;
    }

    if (files && files.image) {
      sub.image = files.image[0].filename; // Assuming files.image is an array containing uploaded images
    }

    await sub.save();
    return sub;
  }
}
