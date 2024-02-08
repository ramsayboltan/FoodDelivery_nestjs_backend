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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const mongoose_1 = require("mongoose");
const customer_schema_1 = require("../../models/customer.schema");
const mongoose_2 = require("@nestjs/mongoose");
const users_schema_1 = require("../../models/users.schema");
const string_1 = require("../../utils/string");
const bcrypt_1 = require("../../utils/bcrypt");
const address_service_1 = require("../address/address.service");
const validate_1 = require("../../utils/validate");
const moment = require("moment");
const address_schema_1 = require("../../models/address.schema");
const toObjectId = mongoose_1.Types.ObjectId;
let CustomersService = class CustomersService {
    constructor(customerModel, addressModel, userModel, addressService, userService) {
        this.customerModel = customerModel;
        this.addressModel = addressModel;
        this.userModel = userModel;
        this.addressService = addressService;
        this.userService = userService;
    }
    async createCustomer(model) {
        const isExist = await this.userModel.findOne({
            email: model.email,
            role: 'customer',
            is_deleted: true,
        });
        if (isExist) {
            throw new common_1.HttpException('Customer already exist', common_1.HttpStatus.BAD_REQUEST);
        }
        model.password = (0, bcrypt_1.createHash)(model.password);
        model.role = 'customer';
        const user = await this.userService.build(model);
        const customer_payload = {
            user: user._id,
            mode: model.mode,
            note: model.note,
            admin_note: model.admin_note,
        };
        if (model.address && model.address.length > 0) {
            const mappedAddress = model.address.map(add => {
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
            customer_payload['address'] = [...address_resp].map(doc => doc._id);
        }
        const customer = await new this.customerModel({ ...customer_payload }).save();
        return customer;
    }
    async getAllCustomer(id, query) {
        let { page_number = '1', page_size = '50' } = query;
        page_number = Number(page_number);
        page_size = Number(page_size);
        const skip = (page_number - 1) * page_size;
        const customers = await this.customerModel.aggregate([
            {
                $match: {
                    mode: new toObjectId(id),
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
                    from: 'addresses',
                    localField: 'address',
                    foreignField: '_id',
                    as: 'address',
                },
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
                $project: {
                    'user.password': false,
                    'user.device_token': false,
                    'user.token': false,
                },
            },
            {
                $lookup: {
                    from: 'orders',
                    let: { customerId: '$user._id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$$customerId', '$customer_id'],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'driver_id',
                                foreignField: '_id',
                                as: 'driver_user',
                            },
                        },
                        {
                            $unwind: '$driver_user',
                        },
                        {
                            $lookup: {
                                from: 'drivers',
                                localField: 'driver_user._id',
                                foreignField: 'user',
                                as: 'driver_user.driver',
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
        return customers;
    }
    async getById(id) {
        const [customer] = await this.customerModel.aggregate([
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
                    let: { customerId: '$user._id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$$customerId', '$customer_id'],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'driver_id',
                                foreignField: '_id',
                                as: 'driver_user',
                            },
                        },
                        {
                            $unwind: '$driver_user',
                        },
                        {
                            $lookup: {
                                from: 'drivers',
                                localField: 'driver_user._id',
                                foreignField: 'user',
                                as: 'driver_user.driver',
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
        return customer;
    }
    async updateCustomer(id, model) {
        const [user, customer] = await Promise.all([this.userModel.findById(id), this.customerModel.findOne({ user: id })]);
        if (!user || !customer) {
            throw new common_1.HttpException('customer not found', common_1.HttpStatus.BAD_REQUEST);
        }
        await this.userService.updateUser(id, model);
        if ((0, string_1.isValidString)(model.note)) {
            customer.note = model.note;
        }
        if ((0, string_1.isValidString)(model.admin_note)) {
            customer.admin_note = model.admin_note;
        }
        if (model.address && model.address.length > 0) {
            if (customer.address.length === 5) {
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
            customer.address.push(...address_resp.map((doc) => doc._id.toString()));
        }
        await customer.save();
        return 'customer updated';
    }
    async remove(id) {
        const user = await this.userModel.findById({ _id: id, role: 'customer' });
        if (!user) {
            throw new common_1.HttpException('customer not found', common_1.HttpStatus.BAD_REQUEST);
        }
        user.is_deleted = true;
        await user.save();
        return 'customer removed';
    }
    async removeManyCustomer(customer_ids) {
        const is_all_valid = (0, validate_1.isAllvalidMongoObjectIds)(customer_ids);
        if (!is_all_valid) {
            throw new common_1.HttpException('Invalid ids', common_1.HttpStatus.BAD_REQUEST);
        }
        const updated = await this.userModel.updateMany({
            _id: customer_ids,
        }, {
            $set: {
                is_deleted: true,
            },
        }, { multi: true });
        if (!updated) {
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return 'customers removed';
    }
    async searchCustomer(name) {
        const customer = await this.customerModel.aggregate([
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
                    'user.fullname': {
                        $regex: `.*${name}.*`,
                        $options: 'i',
                    },
                },
            },
        ]);
        return customer;
    }
    async filterCustomer(query) {
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
            $match: { $or: [] },
        };
        if (is_active) {
            matchQuery['$match']['$or'].push({ 'user.is_activated': true });
        }
        if (is_inactive) {
            matchQuery['$match']['$or'].push({ 'user.is_activated': false });
        }
        if (is_active || is_inactive) {
            pipeline.push(matchQuery);
        }
        if (query.date_from && query.date_to) {
            const start_date = moment(query.date_from).startOf('days').toISOString();
            const end_date = moment(query.date_to).endOf('days').toISOString();
            const date_match = {
                $match: {
                    $and: [{ created_at: { $gte: new Date(start_date) } }, { created_at: { $lte: new Date(end_date) } }],
                },
            };
            pipeline.push(date_match);
        }
        if (query.sort_order) {
            const sorting = {
                $sort: {
                    'user.fullname': query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
                },
            };
            pipeline.push({ ...sorting });
        }
        const data = await this.customerModel.aggregate(pipeline);
        return data;
    }
    async updateAddress(id, model) {
        const address = await this.addressModel.findById(id);
        if (!address) {
            throw new common_1.HttpException('Address not found', common_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, string_1.isValidString)(model.address_line1)) {
            address.address_line1 = model.address_line1;
        }
        if ((0, string_1.isValidString)(model.address_line2)) {
            address.address_line2 = model.address_line2;
        }
        if ((0, string_1.isValidString)(model.state)) {
            address.state = model.state;
        }
        if ((0, string_1.isValidString)(model.city)) {
            address.city = model.city;
        }
        if ((0, string_1.isValidString)(model.zip_code)) {
            address.zip_code = model.zip_code;
        }
        if ((0, string_1.isValidString)(model.country)) {
            address.country = model.country;
        }
        address.updated_at = new Date();
        await address.save();
        return address;
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(customer_schema_1.Customer.name)),
    __param(1, (0, mongoose_2.InjectModel)(address_schema_1.Address.name)),
    __param(2, (0, mongoose_2.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        address_service_1.AddressService,
        users_service_1.UsersService])
], CustomersService);
//# sourceMappingURL=customers.service.js.map