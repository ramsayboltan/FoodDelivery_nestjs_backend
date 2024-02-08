import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Mode } from '../../models/modes.schema';
import { createModeDto } from './modes.dto';
import { Observable } from 'rxjs';
import { pagingQueryType } from 'src/helpers/types/common';
import { isValidString } from 'src/utils/string';

@Injectable()
export class ModesService {
  constructor(@InjectModel(Mode.name) private modeModel: Model<Mode>) {}

  async build(model: createModeDto) {
    const { name, display_name, description, is_activated, note, admin_note } = model;
    const mode = new this.modeModel({
      name,
      display_name,
      description,
      is_activated,
      note,
      admin_note,
    }).save();
    return mode;
  }

  async createMode(model: createModeDto): Promise<Mode> {
    const mode = await this.build(model);
    if (!mode) {
      throw new HttpException('mode not found', HttpStatus.BAD_REQUEST);
    }
    return mode;
  }

  async getAllMode(query: Required<pagingQueryType>): Promise<Mode[] | Observable<Mode[]>> {
    let { page_number = '1', page_size = '40' } = query;

    page_number = Number(page_number);
    page_size = Number(page_size);
    const skip = (page_number - 1) * page_size;

    const all_modes = await this.modeModel.aggregate([
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
    return all_modes;
  }

  async getById(id: string): Promise<Mode[]> {
    const mode = await this.modeModel.aggregate([
      {
        $match: { $and: [{ _id: new Types.ObjectId(id) }, { is_deleted: false }] },
      },
    ]);
    return mode;
  }

  async updateMode<T>(id: T | string, model: Partial<Mode>): Promise<Mode | Observable<Mode>> {
    const mode = await this.modeModel.findById({ _id: id });
    if (!mode) {
      throw new HttpException('mode not found', HttpStatus.BAD_REQUEST);
    }
    if (isValidString(model.name)) {
      mode.name = model.name;
    }
    if (isValidString(model.display_name)) {
      mode.display_name = model.display_name;
    }
    if (model.is_activated) {
      mode.is_activated = model.is_activated;
    }
    if (isValidString(model.description)) {
      mode.description = model.description;
    }
    if (isValidString(model.note)) {
      mode.note = model.note;
    }
    if (isValidString(model.admin_note)) {
      mode.admin_note = model.admin_note;
    }
    await mode.save();
    return mode;
  }

  async DeleteMode(id: string): Promise<Mode | Observable<Mode | any>> {
    const mode = await this.modeModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          is_deleted: true,
        },
      },
    );
    await mode.save();
    return mode;
  }

  async searchModes(query: string): Promise<Mode[]> {
    if (!query || typeof query !== 'string') {
      return [];
    }

    const modes = await this.modeModel.find({ name: { $regex: query, $options: 'i' } }).exec();

    return modes;
  }
}
