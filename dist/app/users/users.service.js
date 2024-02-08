"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const users_schema_1 = require("../../models/users.schema");
const bcrypt_1 = require("../../utils/bcrypt");
const jwt_1 = require("@nestjs/jwt");
const string_1 = require("../../utils/string");
const fs_1 = require("fs");
const path_1 = require("path");
const file_1 = require("../../utils/file");
let UsersService = class UsersService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async build(model) {
        const { is_activated, fullname, mode, dob, gender, password, email, alter_contact_number, contact_number, role, location, } = model;
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
    async createUser(model) {
        const isExist = await this.userModel.findOne({
            email: model.email,
            role: model.role,
        });
        if (isExist) {
            throw new common_1.HttpException('User already exist', common_1.HttpStatus.BAD_REQUEST);
        }
        model.password = (0, bcrypt_1.createHash)(model.password);
        return await this.build(model);
    }
    async getAllUser(id, queryParams) {
        let { page_no = '1', page_size = '50' } = queryParams;
        page_no = Number(page_no);
        page_size = Number(page_size);
        const skip = (page_no - 1) * page_size;
        const all_users = await this.userModel.aggregate([
            {
                $match: {
                    $and: [
                        { mode: new mongoose_1.Types.ObjectId(id) },
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
    async login(payload) {
        const { email, password } = payload;
        const user = await this.userModel.findOne({ email: email });
        if (!user) {
            throw new common_1.HttpException('user not found', common_1.HttpStatus.BAD_REQUEST);
        }
        const isPassMatched = (0, bcrypt_1.compareHash)(user.password, password);
        if (!isPassMatched) {
            throw new common_1.HttpException('user not found', common_1.HttpStatus.BAD_REQUEST);
        }
        const token = this.jwtService.sign({ _id: user._id });
        delete user.password;
        user.token = token;
        await user.save();
        return user;
    }
    async getByIdUser(id) {
        const user = this.userModel.findById({ _id: id }, { password: 0 });
        return user;
    }
    async softDelete(id) {
        const user = await this.userModel.findByIdAndUpdate({ _id: id }, {
            $set: {
                is_deleted: true,
            },
        });
        return user;
    }
    async updateUser(id, model) {
        const user = await this.userModel.findByIdAndUpdate({ _id: id }, {
            password: 0,
            token: 0,
            device_token: 0,
        });
        if (!user) {
            throw new common_1.HttpException('user not found', common_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, string_1.isValidString)(model.fullname)) {
            user.fullname = model.fullname;
        }
        if (model.location) {
            model.location['type'] = 'Point';
            user.location = model.location;
        }
        if ((0, string_1.isValidString)(model.email)) {
            user.email = model.email;
        }
        if (model.dob) {
            user.dob = new Date(model.dob);
        }
        if ((0, string_1.isValidString)(model.gender)) {
            user.gender = model.gender;
        }
        if ((0, string_1.isValidString)(model.contact_number)) {
            user.contact_number = model.contact_number;
        }
        if ((0, string_1.isValidString)(model.alter_contact_number)) {
            user.alter_contact_number = model.alter_contact_number;
        }
        if (model.is_activated !== undefined || model.is_activated !== null) {
            user.is_activated = model.is_activated;
        }
        await user.save();
        return user;
    }
    async uploadProfileImage(id, file) {
        const user = await this.userModel.findById({ _id: id });
        if (!user) {
            throw new common_1.HttpException('user not found', common_1.HttpStatus.BAD_REQUEST);
        }
        if (user.avatar) {
            const dest = (0, path_1.join)(process.cwd(), 'assets/images', user.avatar);
            (0, fs_1.unlinkSync)(dest);
            try {
            }
            finally {
                console.warn('file, remove operation');
            }
        }
        const filename = (0, file_1.genrateFileName)(file);
        const dest = (0, path_1.join)(process.cwd(), 'assets/images', filename);
        (0, fs_1.writeFileSync)(dest, Buffer.from(file.buffer));
        await this.userModel.findByIdAndUpdate({ _id: id }, { $set: { avatar: filename } });
        return 'file uploaded';
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model, jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map