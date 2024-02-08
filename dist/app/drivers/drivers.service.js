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
exports.DriversService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const users_service_1 = require("../users/users.service");
const drivers_schema_1 = require("../../models/drivers.schema");
const users_schema_1 = require("../../models/users.schema");
const address_service_1 = require("../address/address.service");
const string_1 = require("../../utils/string");
const bcrypt_1 = require("../../utils/bcrypt");
const address_schema_1 = require("../../models/address.schema");
const toObjectId = mongoose_1.Types.ObjectId;
let DriversService = class DriversService {
    constructor(driverModel, userModel, addressModel, addressService, userService) {
        this.driverModel = driverModel;
        this.userModel = userModel;
        this.addressModel = addressModel;
        this.addressService = addressService;
        this.userService = userService;
    }
    async build(files, model) {
        let { statics, vehicle_details, driver_criteria, bank_details } = model;
        const { user, mode, admin_note, note, address } = model;
        statics && (statics = JSON.parse(statics));
        bank_details && (bank_details = JSON.parse(bank_details.toString()));
        vehicle_details && (vehicle_details = JSON.parse(vehicle_details.toString()));
        driver_criteria && (driver_criteria = JSON.parse(driver_criteria));
        const [rc__file] = files.rc_image;
        const [govt_id_file] = files.govt_id_image;
        const [liscense_file] = files.liscense_image;
        const [verified_picture_file] = files.verified_picture;
        const documents = {
            rc_image: rc__file.filename,
            liscense_image: liscense_file.filename,
            govt_id_image: govt_id_file.filename,
            verified_picture: verified_picture_file.filename,
        };
        const driver = await new this.driverModel({
            user,
            statics,
            vehicle_details,
            bank_details,
            documents,
            mode,
            driver_criteria,
            admin_note,
            note,
            address,
        }).save();
        return driver;
    }
    async createDriver(files, model) {
        const isExist = await this.userModel.findOne({
            email: model.email,
            role: 'driver',
            is_deleted: true,
        });
        if (isExist) {
            throw new common_1.HttpException('driver already exist', common_1.HttpStatus.BAD_REQUEST);
        }
        model.password = (0, bcrypt_1.createHash)(model.password);
        model.role = 'driver';
        const user = await this.userService.build(model);
        const driver_payload = {
            user: user._id,
            note: model.note,
            admin_note: model.admin_note,
            statics: model.statics,
            vehicle_details: model.vehicle_details,
            bank_details: model.bank_details,
            documents: model.documents,
            driver_criteria: model.driver_criteria,
        };
        if (model.address && model.address.length > 0) {
            const mappedAddress = JSON.parse(model.address).map(add => {
                return {
                    type: add.type,
                    user: user._id.toString(),
                    is_activated: add.is_activated,
                    country: add.country,
                    state: add.state,
                    city: add.city,
                    address_line1: add.address_line1,
                    address_line2: add.address_line2,
                    zip_code: add.zip_code,
                };
            });
            const address_resp = await this.addressService.createMany([...mappedAddress]);
            driver_payload['address'] = [...address_resp].map(doc => doc._id);
        }
        const driver = await this.build(files, { ...driver_payload });
        return driver;
    }
    async getAllDrivers(id, query) {
        let { page_number = '1', page_size = '50' } = query;
        page_number = Number(page_number);
        page_size = Number(page_size);
        const skip = (page_number - 1) * page_size;
        const pipeline = [
            {
                $match: {
                    mode: new mongoose_1.Types.ObjectId(id),
                },
            },
            {
                $skip: skip,
            },
            {
                $limit: page_size,
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: {
                    path: '$user',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $match: {
                    'user.is_deleted': false,
                },
            },
            {
                $lookup: {
                    from: 'addresses',
                    localField: 'user._id',
                    foreignField: 'user',
                    as: 'address',
                },
            },
            {
                $project: {
                    'user.password': false,
                    'user.device_token': false,
                    'user.token': false,
                },
            },
            {
                $lookup: {
                    from: 'orders',
                    let: { driverId: '$user._id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$$driverId', '$driver_id'],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'customer_id',
                                foreignField: '_id',
                                as: 'customer_user',
                            },
                        },
                        {
                            $unwind: '$customer_user',
                        },
                        {
                            $lookup: {
                                from: 'customers',
                                localField: 'customer_user._id',
                                foreignField: 'user',
                                as: 'customer_user.customer',
                            },
                        },
                        {
                            $lookup: {
                                from: 'stores',
                                localField: 'restaurant_id',
                                foreignField: '_id',
                                as: 'restaurant_id',
                            },
                        },
                        {
                            $lookup: {
                                from: 'items',
                                localField: 'item_id',
                                foreignField: '_id',
                                as: 'item_id',
                            },
                        },
                        { $unwind: { path: '$item_id', preserveNullAndEmptyArrays: true } },
                    ],
                    as: 'orders',
                },
            },
        ];
        const drivers = await this.driverModel.aggregate([...pipeline]);
        return drivers;
    }
    async getByIdDriver(id) {
        const [driver] = await this.driverModel.aggregate([
            {
                $match: { user: new toObjectId(id) },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: {
                    path: '$user',
                    preserveNullAndEmptyArrays: false,
                },
            },
            {
                $lookup: {
                    from: 'addresses',
                    localField: 'user._id',
                    foreignField: 'user',
                    as: 'address',
                },
            },
            {
                $match: {
                    'user.is_deleted': false,
                },
            },
            {
                $lookup: {
                    from: 'orders',
                    let: { driverId: '$user._id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$$driverId', '$driver_id'],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'customer_id',
                                foreignField: '_id',
                                as: 'customer_user',
                            },
                        },
                        {
                            $unwind: '$customer_user',
                        },
                        {
                            $lookup: {
                                from: 'customers',
                                localField: 'customer_user._id',
                                foreignField: 'user',
                                as: 'customer_user.customer',
                            },
                        },
                        {
                            $lookup: {
                                from: 'stores',
                                localField: 'restaurant_id',
                                foreignField: '_id',
                                as: 'restaurant_id',
                            },
                        },
                        {
                            $lookup: {
                                from: 'items',
                                localField: 'item_id',
                                foreignField: '_id',
                                as: 'item_id',
                            },
                        },
                        { $unwind: { path: '$item_id', preserveNullAndEmptyArrays: true } },
                    ],
                    as: 'orders',
                },
            },
        ]);
        return driver;
    }
    async updateDriver(id, model) {
        const [user, driver] = await Promise.all([this.userModel.findById(id), this.driverModel.findOne({ user: id })]);
        if (!user || !driver) {
            throw new common_1.HttpException('Driver not found', common_1.HttpStatus.BAD_REQUEST);
        }
        await this.userService.updateUser(id, model);
        if (model.bank_details) {
            driver.bank_details = model.bank_details;
        }
        if (model.statics) {
            driver.statics = model.statics;
        }
        if (model.driver_criteria) {
            driver.driver_criteria = model.driver_criteria;
        }
        if (model.vehicle_details) {
            driver.vehicle_details = model.vehicle_details;
        }
        if ((0, string_1.isValidString)(model.note)) {
            driver.note = model.note;
        }
        if ((0, string_1.isValidString)(model.admin_note)) {
            driver.admin_note = model.admin_note;
        }
        if (model.address && model.address.length > 0) {
            if (driver.address.length === 5) {
                throw new common_1.HttpException('you cannot add more than 5 address', common_1.HttpStatus.BAD_REQUEST);
            }
            const mappedAddress = model.address.map(add => ({
                type: add.type,
                user: user._id.toString(),
                is_activated: add.is_activated,
                country: add.country,
                state: add.state,
                city: add.city,
                address_line1: add.address_line1,
                address_line2: add.address_line2,
                zip_code: add.zip_code,
            }));
            const address_resp = await this.addressService.createMany([...mappedAddress]);
            driver.address.push(...address_resp.map((doc) => doc._id.toString()));
        }
        await driver.save();
        return 'driver updated';
    }
    async deleteDriver(id) {
        const user = await this.userModel.findById({ _id: id, role: 'user' });
        if (!user) {
            throw new common_1.HttpException('driver not found', common_1.HttpStatus.BAD_REQUEST);
        }
        user.is_deleted = true;
        await user.save();
        return 'user removed';
    }
    async searchDriver(searchValue) {
        const driver = await this.driverModel.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: '$user',
            },
            {
                $match: {
                    'user.is_deleted': false,
                    $or: [
                        {
                            'user.fullname': {
                                $regex: `.*${searchValue}.*`,
                                $options: 'i',
                            },
                        },
                        {
                            'user.email': {
                                $regex: `.*${searchValue}.*`,
                                $options: 'i',
                            },
                        },
                    ],
                },
            },
        ]);
        return driver;
    }
    async uploadProfileImage(id, files) {
        try {
            const user = await this.userModel.findByIdAndUpdate(id);
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.BAD_REQUEST);
            }
            const driver = await this.driverModel.findOne({ user: id });
            if (!driver) {
                throw new common_1.HttpException('Driver not found', common_1.HttpStatus.BAD_REQUEST);
            }
            driver.documents = {
                ...driver.documents,
                rc_image: files.rc_image[0].filename,
                govt_id_image: files.govt_id_image[0].filename,
                liscense_image: files.liscense_image[0].filename,
                verified_picture: files.verified_picture[0].filename,
            };
            await driver.save();
            return 'Image upload successful';
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async driverFilter(query) {
        const is_active = JSON.parse(query.is_active);
        const is_inactive = JSON.parse(query.is_inactive);
        const pipeline = [
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: '$user',
            },
            {
                $match: {
                    'user.is_deleted': false,
                },
            },
        ];
        const matchQuery = {
            $match: { $and: [] },
        };
        if (is_active) {
            matchQuery['$match']['$and'].push({ 'user.is_activated': true });
        }
        if (is_inactive) {
            matchQuery['$match']['$and'].push({ 'user.is_activated': false });
        }
        if (is_active || is_inactive) {
            pipeline.push(matchQuery);
        }
        if (query.sort_order) {
            const sorting = {
                $sort: {
                    'user.fullname': query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
                },
            };
            pipeline.push({ ...sorting });
        }
        if (query.sort_order) {
            const sorting = {
                $sort: {
                    by_earning: query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
                },
            };
            pipeline.push({ ...sorting });
        }
        if (query.sort_order) {
            const sorting = {
                $sort: {
                    by_rating: query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
                },
            };
            pipeline.push({ ...sorting });
        }
        if (query.sort_order) {
            const sorting = {
                $sort: {
                    by_riding: query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
                },
            };
            pipeline.push({ ...sorting });
        }
        const data = await this.driverModel.aggregate([...pipeline]);
        return data;
    }
};
exports.DriversService = DriversService;
exports.DriversService = DriversService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(drivers_schema_1.Driver.name)),
    __param(1, (0, mongoose_2.InjectModel)(users_schema_1.User.name)),
    __param(2, (0, mongoose_2.InjectModel)(address_schema_1.Address.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        address_service_1.AddressService,
        users_service_1.UsersService])
], DriversService);
//# sourceMappingURL=drivers.service.js.map