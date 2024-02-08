import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Observable } from 'rxjs';
import { userInterface } from '../../helpers/interfaces/user.interface';
import { isValidString } from '@app/utils/string';
import { writeFileSync, unlinkSync } from 'fs';
import { createTagDto, tagFilterDto } from './tag.dto';
import { Tag } from '@app/models/tag.schema';
import { JwtService } from '@nestjs/jwt';
import { tagInterface } from '@app/helpers/interfaces/tag';
import * as moment from 'moment';
@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private TagModel: Model<Tag>, private jwtService: JwtService) {}

  async build(model: createTagDto) {
    const { tagname, tittle, is_activated, mode, display_name, description } = model;

    const tag = new this.TagModel({
      tagname,
      mode,
      tittle,
      display_name,
      description,
      is_activated,
    }).save();
    return tag;
  }

  async createtag(model: createTagDto): Promise<Tag> {
    return await this.build(model);
  }

  async getAlltag(id: string, queryParams): Promise<Tag[]> {
    let { page_no = '1', page_size = '50' } = queryParams;

    page_no = Number(page_no);
    page_size = Number(page_size);

    const skip = (page_no - 1) * page_size;

    const all_users = await this.TagModel.aggregate([
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
        $skip: skip,
      },
      {
        $limit: page_size,
      },
    ]);
    return all_users;
  }

  async softDelete(id: string): Promise<Tag | Observable<Tag | any>> {
    const tag = await this.TagModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          is_deleted: true,
        },
      },
    );
    return tag;
  }

  async updateUser<T>(id: T | string, model: Partial<Tag>): Promise<Tag | Observable<Tag>> {
    const tag = await this.TagModel.findById(
      { _id: id },
      {
        password: 0,
        token: 0,
        device_token: 0,
      },
    );

    if (!tag) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }

    if (
      isValidString(model.tagname !== 'string' && model.tagname !== undefined && model.tagname !== '' && model.tagname)
    ) {
      tag.tagname = model.tagname;
    }

    if (isValidString(model.tittle !== 'string' && model.tittle !== undefined && model.tittle !== '' && model.tittle)) {
      tag.tittle = model.tittle;
    }

    if (
      isValidString(
        model.display_name !== 'string' &&
          model.display_name !== undefined &&
          model.display_name !== '' &&
          model.display_name,
      )
    ) {
      tag.display_name = model.display_name;
    }

    if (
      isValidString(
        model.description !== 'string' &&
          model.description !== undefined &&
          model.description !== '' &&
          model.description,
      )
    ) {
      tag.description = model.description;
    }

    if (model.updated_at) {
      tag.updated_at = model.updated_at;
    }

    tag.updated_at = new Date();
    await tag.save();
    return tag;
  }
  async searchTag(name): Promise<Tag[] | Observable<Tag[]>> {
    const customer = await this.TagModel.aggregate([
      {
        $match: {
          is_deleted: false,
          tagname: {
            $regex: `.*${name}.*`,
            $options: 'i',
          },
        },
      },
    ]);
    return customer;
  }
  async filterTag<T extends Partial<tagFilterDto>>(query: T): Promise<Tag[]> {
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
          tagname: query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
        },
      };

      pipeline.push({ ...sorting } as any);
    }

    const data = await this.TagModel.aggregate(pipeline);
    return data;
  }
}
