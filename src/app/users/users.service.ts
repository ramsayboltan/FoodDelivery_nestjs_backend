import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../models/users.schema';
import { createUserDto } from './users.dto';
import { createHash, compareHash } from '../../utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { userInterface } from '../../helpers/interfaces/user.interface';
import { isValidString } from '@app/utils/string';
import { writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { genrateFileName } from '@app/utils/file';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) {}

  async build(model: createUserDto) {
    const {
      is_activated,
      fullname,
      mode,
      dob,
      gender,
      password,
      email,
      alter_contact_number,
      contact_number,
      role,
      location,
    } = model;

    const user = new this.userModel({
      is_activated,
      fullname,
      mode,
      dob,
      role,
      email,
      gender,
      password,
      location,
      alter_contact_number,
      contact_number,
    }).save();
    return user;
  }

  async createUser(model: createUserDto): Promise<User> {
    const isExist = await this.userModel.findOne({
      email: model.email,
      role: model.role,
    });

    if (isExist) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }

    model.password = createHash(model.password);

    return await this.build(model);
  }

  async getAllUser(id: string, queryParams): Promise<User[]> {
    let { page_no = '1', page_size = '50' } = queryParams;

    page_no = Number(page_no);
    page_size = Number(page_size);

    const skip = (page_no - 1) * page_size;

    const all_users = await this.userModel.aggregate([
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

  async login(payload): Promise<Exclude<User, 'password'>> {
    const { email, password } = payload;
    const user = await this.userModel.findOne({ email: email });

    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }

    const isPassMatched = compareHash(user.password, password);

    if (!isPassMatched) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    const token = this.jwtService.sign({ _id: user._id });
    delete user.password;
    user.token = token;
    await user.save();
    return user;
  }

  async getByIdUser(id: string): Promise<User | Observable<any | User>> {
    const user = this.userModel.findById({ _id: id }, { password: 0 });
    return user;
  }

  async softDelete(id: string): Promise<User | Observable<User | any>> {
    const user = await this.userModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          is_deleted: true,
        },
      },
    );
    return user;
  }

  async updateUser<T>(id: T | string, model: Partial<userInterface>): Promise<User | Observable<User>> {
    const user = await this.userModel.findByIdAndUpdate(
      { _id: id },
      {
        password: 0,
        token: 0,
        device_token: 0,
      },
    );

    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }

    // if (isValidString(model.firstname)) {
    //   user.firstname = model.firstname;
    // }
    // if (isValidString(model.lastname)) {
    //   user.lastname = model.lastname;
    // }

    if (isValidString(model.fullname)) {
      user.fullname = model.fullname;
    }

    if (model.location) {
      model.location['type'] = 'Point';
      user.location = model.location;
    }

    if (isValidString(model.email)) {
      user.email = model.email;
    }

    if (model.dob) {
      user.dob = new Date(model.dob);
    }

    if (isValidString(model.gender)) {
      user.gender = model.gender;
    }

    if (isValidString(model.contact_number)) {
      user.contact_number = model.contact_number;
    }

    if (isValidString(model.alter_contact_number)) {
      user.alter_contact_number = model.alter_contact_number;
    }

    if (model.is_activated !== undefined || model.is_activated !== null) {
      user.is_activated = model.is_activated;
    }
    await user.save();
    return user;
  }

  async uploadProfileImage(id: string, file: Express.Multer.File): Promise<string> {
    const user = await this.userModel.findById({ _id: id });

    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }

    if (user.avatar) {
      const dest = join(process.cwd(), 'assets/images', user.avatar);
      unlinkSync(dest);
      try {
      } finally {
        console.warn('file, remove operation');
      }
    }

    const filename = genrateFileName(file);
    const dest = join(process.cwd(), 'assets/images', filename);

    writeFileSync(dest, Buffer.from(file.buffer));

    await this.userModel.findByIdAndUpdate({ _id: id }, { $set: { avatar: filename } });
    return 'file uploaded';
  }
}
