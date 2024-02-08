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
exports.StoreService = void 0;
const common_1 = require("@nestjs/common");
const store_schema_1 = require("../../models/store.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const string_1 = require("../../utils/string");
const toObjectId = mongoose_1.Types.ObjectId;
let StoreService = class StoreService {
    constructor(storeModel) {
        this.storeModel = storeModel;
    }
    async build(model) {
        const { name, email, bank_details, address, mode, opening_closing, contact_number, description, owner, website, location, } = model;
        const store = await new this.storeModel({
            name,
            email,
            contact_number,
            description,
            owner,
            mode,
            website,
            bank_details: bank_details,
            address: address,
            opening_closing,
            location,
        }).save();
        return store;
    }
    async createStore(model) {
        const isExist = await this.storeModel.findOne({
            owner: model.owner,
            name: model.name,
        });
        if (isExist) {
            throw new common_1.HttpException(`You already created, named with ${model.name}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const data = await this.build(model);
        return data;
    }
    async getAll(id, query) {
        let { page_no = '1', page_size = '50' } = query;
        page_no = Number(page_no);
        page_size = Number(page_size);
        const skip = (page_no - 1) * page_size;
        const data = await this.storeModel.aggregate([
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
                $lookup: {
                    from: 'menus',
                    let: { storeId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$$storeId', '$store'],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: 'items',
                                localField: '_id',
                                foreignField: 'menu',
                                as: 'items',
                            },
                        },
                    ],
                    as: 'menus',
                },
            },
            {
                $unwind: {
                    path: '$menus',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'orders',
                    let: { storeId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$$storeId', '$restaurant_id'],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: 'customers',
                                localField: 'customer_id',
                                foreignField: '_id',
                                as: 'customer_id',
                            },
                        },
                        { $unwind: { path: '$customer_id', preserveNullAndEmptyArrays: true } },
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'customer_id.user',
                                foreignField: '_id',
                                as: 'customer_id.user',
                            },
                        },
                        { $unwind: { path: '$customer_id.user', preserveNullAndEmptyArrays: true } },
                        {
                            $lookup: {
                                from: 'drivers',
                                localField: 'driver_id',
                                foreignField: '_id',
                                as: 'driver_id',
                            },
                        },
                        { $unwind: { path: '$driver_id', preserveNullAndEmptyArrays: true } },
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'driver_id.user',
                                foreignField: '_id',
                                as: 'driver_id.user',
                            },
                        },
                        { $unwind: { path: '$driver_id.user', preserveNullAndEmptyArrays: true } },
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
            {
                $skip: skip,
            },
            {
                $limit: Number(page_size),
            },
        ]);
        return data;
    }
    async remove(id) {
        const store = await this.storeModel.findByIdAndUpdate({ _id: id }, {
            $set: {
                is_deleted: true,
            },
        });
        if (!store) {
            throw new common_1.HttpException(`store not found`, common_1.HttpStatus.BAD_REQUEST);
        }
        return 'store deleted';
    }
    async getById(id) {
        const [store] = await this.storeModel.aggregate([
            {
                $match: { _id: new toObjectId(id) },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'owner',
                    foreignField: '_id',
                    as: 'owner',
                },
            },
            {
                $lookup: {
                    from: 'menus',
                    let: { storeId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$$storeId', '$store'],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: 'items',
                                localField: '_id',
                                foreignField: 'menu',
                                as: 'items',
                            },
                        },
                    ],
                    as: 'menus',
                },
            },
            {
                $lookup: {
                    from: 'orders',
                    let: { storeId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$$storeId', '$restaurant_id'],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'customer_id',
                                foreignField: '_id',
                                as: 'customer_id',
                            },
                        },
                        { $unwind: { path: '$customer_id', preserveNullAndEmptyArrays: true } },
                        {
                            $lookup: {
                                from: 'customers',
                                let: { customerId: '$customer_id._id' },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ['$$customerId', '$user'],
                                            },
                                        },
                                    },
                                    {
                                        $lookup: {
                                            from: 'addresses',
                                            localField: 'address',
                                            foreignField: '_id',
                                            as: 'address',
                                        },
                                    },
                                    { $unwind: { path: '$address', preserveNullAndEmptyArrays: true } },
                                ],
                                as: 'customer',
                            },
                        },
                        { $unwind: { path: '$customer', preserveNullAndEmptyArrays: true } },
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'driver_id',
                                foreignField: '_id',
                                as: 'driver_id',
                            },
                        },
                        { $unwind: { path: '$driver_id', preserveNullAndEmptyArrays: true } },
                        {
                            $lookup: {
                                from: 'drivers',
                                let: { driverId: '$driver_id._id' },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ['$$driverId', '$user'],
                                            },
                                        },
                                    },
                                    {
                                        $lookup: {
                                            from: 'addresses',
                                            localField: 'address',
                                            foreignField: '_id',
                                            as: 'address',
                                        },
                                    },
                                    { $unwind: { path: '$address', preserveNullAndEmptyArrays: true } },
                                ],
                                as: 'driver',
                            },
                        },
                        { $unwind: { path: '$driver', preserveNullAndEmptyArrays: true } },
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
            {
                $unwind: {
                    path: '$menus',
                    preserveNullAndEmptyArrays: true,
                },
            },
        ]);
        return store;
    }
    async update(id, model) {
        const store = await this.storeModel.findById(id);
        if (!store) {
            throw new common_1.HttpException(`store not found`, common_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, string_1.isValidString)(model.name)) {
            store.name = model.name;
        }
        if ((0, string_1.isValidString)(model.email)) {
            store.email = model.email;
        }
        if ((0, string_1.isValidString)(model.contact_number)) {
            store.contact_number = model.contact_number;
        }
        if ((0, string_1.isValidString)(model.description)) {
            store.description = model.description;
        }
        if (model.delivery_radius) {
            store.delivery_radius = model.delivery_radius;
        }
        if (model.opening_closing) {
            store.opening_closing = model.opening_closing;
        }
        if (model.address) {
            store.address = model.address;
        }
        if (model.location) {
            model.location['type'] = 'Point';
            store.location = model.location;
        }
        if ((0, string_1.isValidString)(model.website)) {
            store.website = model.website;
        }
        if (model.is_activated) {
            store.is_activated = model.is_activated;
        }
        if ((0, string_1.isValidString)(model.note)) {
            store.note = model.note;
        }
        if ((0, string_1.isValidString)(model.admin_note)) {
            store.admin_note = model.admin_note;
        }
        store.updated_at = new Date();
        await store.save();
        return store;
    }
    async uploadImage(id, file) {
        const store = await this.storeModel.findById({ _id: id });
        if (!store) {
            throw new common_1.HttpException(`store not found`, common_1.HttpStatus.BAD_REQUEST);
        }
        store.avatar = file.filename;
        await store.save();
        return 'image upload';
    }
};
exports.StoreService = StoreService;
exports.StoreService = StoreService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(store_schema_1.Store.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], StoreService);
//# sourceMappingURL=store.service.js.map