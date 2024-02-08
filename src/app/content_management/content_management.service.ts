import { ContentManagement } from '../../models/content_management';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uploadProfileImage } from '@app/helpers/types/connent';
import { pagingQueryType } from '@app/helpers/types/content';
import { createUploadProfileDto } from './content_management.dto';
import { Observable, pipe } from 'rxjs';
@Injectable()
export class ContentManagementService {
  constructor(@InjectModel(ContentManagement.name) private contentManagemenet: Model<ContentManagement>) {}

  async build(files) {
    const [banner1_file] = files.banner1;

    const [banner2_file] = files.banner2;

    const [banner3_file] = files.banner3;

    const [banner4_file] = files.banner4;

    const banners = {
      banner1: banner1_file.filename,
      banner2: banner2_file.filename,
      banner3: banner3_file.filename,
      banner4: banner4_file.filename,
    };
    const content = await new this.contentManagemenet({
      banners,
    }).save();
    return content;
  }

  async createUploadProfilebanner(files): Promise<ContentManagement> {
    const content = await this.build(files);
    return content;
  }
  async uploadProfileImage<T extends string, U extends uploadProfileImage>(id: T, file: U): Promise<string> {
    const content = await this.contentManagemenet.findByIdAndUpdate(id);
    if (!content) {
      throw new HttpException(`content not found`, HttpStatus.BAD_REQUEST);
    }
    content.banners = {
      ...content.banners,
      banner1: file.banner1[0].filename,
      banner2: file.banner2[0].filename,
      banner3: file.banner3[0].filename,
      banner4: file.banner4[0].filename,
    };
    await content.save();
    return 'file upload';
  }
  async getAll(query): Promise<ContentManagement[]> {
    let { page_number = '1', page_size = '50' } = query;
    page_number = Number(page_number);
    page_size = Number(page_size);
    const skip = (page_number - 1) * page_size;

    const content = await this.contentManagemenet.aggregate([
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
    return content;
  }
  async getByIdcontent(id: string): Promise<ContentManagement | Observable<ContentManagement | null>> {
    const content = await this.contentManagemenet.findById(id);
    return content;
  }

  async deleteContent(id: string) {
    const content = await this.contentManagemenet.findById(id);
    if (!content) {
      throw new HttpException('content not found', HttpStatus.BAD_REQUEST);
    }
    content.is_deleted = true;
    await content.save();
    return content;
  }
}
