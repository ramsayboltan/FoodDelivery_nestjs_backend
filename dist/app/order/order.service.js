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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const order_schema_1 = require("../../models/order.schema");
const string_1 = require("../../utils/string");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path_1 = require("path");
const moment = require("moment");
let OrderService = class OrderService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    async build(model) {
        const { restaurant_id, item_id, customer_id, driver_id, mode, payment_method, deliveryFee, deliveryAddress, tax, totalAmount, note, admin_note, expiry_Date, card_number, location_from, location_to, order_time, distance, perKilometerRate, status, is_activated, } = model;
        const calculatedFare = this.calculateFare(distance, perKilometerRate);
        const user = new this.orderModel({
            restaurant_id,
            customer_id,
            item_id,
            payment_method,
            card_number,
            deliveryFee,
            deliveryAddress,
            tax,
            totalAmount,
            note,
            admin_note,
            order_time,
            expiry_Date,
            location_from,
            location_to,
            status,
            distance,
            perKilometerRate,
            is_activated,
            driver_id,
            mode,
            fare: calculatedFare.toString(),
        }).save();
        return user;
    }
    calculateFare(distance, perKilometerRate) {
        const distanceInKilometers = parseFloat(distance);
        const perKilometerPrice = parseFloat(perKilometerRate);
        const fare = distanceInKilometers * perKilometerPrice;
        return `$${fare.toFixed(2)}`;
    }
    async createOrder(model) {
        return await this.build(model);
    }
    async getAllOrder(id, queryParams) {
        let { page_no = '1', page_size = '50' } = queryParams;
        page_no = Number(page_no);
        page_size = Number(page_size);
        const skip = (page_no - 1) * page_size;
        const pipeline = [
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
                    from: 'stores',
                    localField: 'restaurant_id',
                    foreignField: '_id',
                    as: 'restaurant_id',
                },
            },
            { $unwind: { path: '$restaurant_id', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'items',
                    localField: 'item_id',
                    foreignField: '_id',
                    as: 'item_id',
                },
            },
            { $unwind: { path: '$item_id', preserveNullAndEmptyArrays: true } },
        ];
        const order = await this.orderModel.aggregate([...pipeline]);
        return order;
    }
    async getByIdOrder(id) {
        const order = await this.orderModel.aggregate([
            {
                $match: { $and: [{ _id: new mongoose_1.Types.ObjectId(id) }, { is_deleted: false }] },
            },
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
                    from: 'stores',
                    localField: 'restaurant_id',
                    foreignField: '_id',
                    as: 'restaurant_id',
                },
            },
            { $unwind: { path: '$restaurant_id', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'items',
                    localField: 'item_id',
                    foreignField: '_id',
                    as: 'item_id',
                },
            },
            { $unwind: { path: '$item_id', preserveNullAndEmptyArrays: true } },
        ]);
        return order;
    }
    async getByCustomerId(id) {
        const order = await this.orderModel.aggregate([
            {
                $match: {
                    is_deleted: false,
                },
            },
            {
                $match: {
                    customer_id: new mongoose_1.Types.ObjectId(id),
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
            { $unwind: '$customer_id' },
            {
                $lookup: {
                    from: 'users',
                    localField: 'driver_id',
                    foreignField: '_id',
                    as: 'driver_id',
                },
            },
            { $unwind: '$driver_id' },
            {
                $lookup: {
                    from: 'stores',
                    localField: 'restaurant_id',
                    foreignField: '_id',
                    as: 'restaurant_id',
                },
            },
            { $unwind: '$restaurant_id' },
        ]);
        return order;
    }
    async getByDriverId(id) {
        const order = await this.orderModel.aggregate([
            {
                $match: {
                    is_deleted: false,
                },
            },
            {
                $match: {
                    driver_id: new mongoose_1.Types.ObjectId(id),
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
            { $unwind: '$customer_id' },
            {
                $lookup: {
                    from: 'users',
                    localField: 'driver_id',
                    foreignField: '_id',
                    as: 'driver_id',
                },
            },
            { $unwind: '$driver_id' },
            {
                $lookup: {
                    from: 'stores',
                    localField: 'restaurant_id',
                    foreignField: '_id',
                    as: 'restaurant_id',
                },
            },
            { $unwind: '$restaurant_id' },
        ]);
        return order;
    }
    async getByRestaurantId(id) {
        const order = await this.orderModel.aggregate([
            {
                $match: {
                    is_deleted: false,
                },
            },
            {
                $match: {
                    restaurant_id: new mongoose_1.Types.ObjectId(id),
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
            { $unwind: '$customer_id' },
            {
                $lookup: {
                    from: 'users',
                    localField: 'driver_id',
                    foreignField: '_id',
                    as: 'driver_id',
                },
            },
            { $unwind: '$driver_id' },
            {
                $lookup: {
                    from: 'stores',
                    localField: 'restaurant_id',
                    foreignField: '_id',
                    as: 'restaurant_id',
                },
            },
            { $unwind: '$restaurant_id' },
        ]);
        return order;
    }
    async softDelete(id) {
        const user = await this.orderModel.findByIdAndUpdate({ _id: id }, {
            $set: {
                is_deleted: true,
            },
        });
        if (!user) {
            throw new common_1.HttpException(`order not found`, common_1.HttpStatus.BAD_REQUEST);
        }
        return 'order deleted';
    }
    async orderUpdate(id, model) {
        const order = await this.orderModel.findByIdAndUpdate({ _id: id });
        if (!order) {
            throw new common_1.HttpException('order not found', common_1.HttpStatus.BAD_REQUEST);
        }
        if (model.restaurant_id) {
            order.restaurant_id = model.restaurant_id;
        }
        if (model.customer_id !== 'string' && model.customer_id !== '' && model.customer_id !== undefined) {
            order.customer_id = model.customer_id;
        }
        if (model.item_id !== 'string' && model.item_id !== '' && model.item_id !== undefined) {
            order.item_id = model.item_id;
        }
        if (model.driver_id !== 'string' && model.driver_id !== '' && model.driver_id !== undefined) {
            order.driver_id = model.driver_id;
        }
        if (model.mode !== 'string' && model.mode !== '' && model.mode !== undefined) {
            order.mode = model.mode;
        }
        if (model.payment_method !== 'string' && model.payment_method !== '' && model.payment_method !== undefined) {
            order.payment_method = model.payment_method;
        }
        if (model.card_number !== 'string' && model.card_number !== '' && model.card_number !== undefined) {
            order.card_number = model.card_number;
        }
        if (model.order_time !== 'string' && model.order_time !== '' && model.order_time !== undefined) {
            order.order_time = model.order_time;
        }
        if (model.order_time !== 'string' && model.order_time !== '' && model.order_time !== undefined) {
            order.order_time = model.order_time;
        }
        if (model.location_from) {
            order.location_from = model.location_from;
        }
        if (model.location_to) {
            order.location_to = model.location_to;
        }
        if ((0, string_1.isValidString)(model.expiry_Date)) {
            order.expiry_Date = model.expiry_Date;
        }
        if ((0, string_1.isValidString)(model.deliveryFee)) {
            order.deliveryFee = model.deliveryFee;
        }
        if ((0, string_1.isValidString)(model.preparing_time)) {
            order.preparing_time = model.preparing_time;
        }
        if ((0, string_1.isValidString)(model.deliveryAddress)) {
            order.deliveryAddress = model.deliveryAddress;
        }
        if ((0, string_1.isValidString)(model.tax)) {
            order.tax = model.tax;
        }
        if ((0, string_1.isValidString)(model.totalAmount)) {
            order.totalAmount = model.totalAmount;
        }
        if ((0, string_1.isValidString)(model.note)) {
            order.note = model.note;
        }
        if ((0, string_1.isValidString)(model.admin_note)) {
            order.admin_note = model.admin_note;
        }
        if ((0, string_1.isValidString)(model.status)) {
            order.status = model.status;
        }
        if ((0, string_1.isValidString)(model.distance)) {
            order.distance = model.distance;
        }
        if ((0, string_1.isValidString)(model.perKilometerRate)) {
            order.perKilometerRate = model.perKilometerRate;
        }
        if (model.is_activated) {
            order.is_activated = model.is_activated;
        }
        if ((0, string_1.isValidString)(model.fare)) {
            order.fare = model.fare;
        }
        await order.save();
        return order;
    }
    async searchOrder(name) {
        const order = await this.orderModel.aggregate([
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
                    from: 'stores',
                    localField: 'restaurant_id',
                    foreignField: '_id',
                    as: 'restaurant_id',
                },
            },
            { $unwind: { path: '$restaurant_id', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'items',
                    localField: 'item_id',
                    foreignField: '_id',
                    as: 'item_id',
                },
            },
            { $unwind: { path: '$item_id', preserveNullAndEmptyArrays: true } },
            { $unwind: { path: '$restaurant_id', preserveNullAndEmptyArrays: true } },
            {
                $match: {
                    is_deleted: false,
                    $or: [
                        {
                            'customer_id.fullname': {
                                $regex: `.*${name}.*`,
                                $options: 'i',
                            },
                        },
                        {
                            'driver_id.fullname': {
                                $regex: `.*${name}.*`,
                                $options: 'i',
                            },
                        },
                        {
                            'item_id.itemName': {
                                $regex: `.*${name}.*`,
                                $options: 'i',
                            },
                        },
                        {
                            'restaurant_id.name': {
                                $regex: `.*${name}.*`,
                                $options: 'i',
                            },
                        },
                    ],
                },
            },
        ]);
        return order;
    }
    async filterOrder(query) {
        const is_active = JSON.parse(query.is_active);
        const is_inactive = JSON.parse(query.is_inactive);
        const pipeline = [
            {
                $match: {
                    is_deleted: false,
                },
            },
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
                    from: 'stores',
                    localField: 'restaurant_id',
                    foreignField: '_id',
                    as: 'restaurant_id',
                },
            },
            { $unwind: { path: '$restaurant_id', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'items',
                    localField: 'item_id',
                    foreignField: '_id',
                    as: 'item_id',
                },
            },
            { $unwind: { path: '$item_id', preserveNullAndEmptyArrays: true } },
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
                    'customer_id.fullname': query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
                    'driver_id.fullname': query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
                    'item_id.itemName': query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
                    'restaurant_id.name': query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
                },
            };
            pipeline.push({ ...sorting });
        }
        const data = await this.orderModel.aggregate(pipeline);
        return data;
    }
    async generatePDF(orderId) {
        const [order] = await this.orderModel.aggregate([
            {
                $match: { $and: [{ _id: new mongoose_1.Types.ObjectId(orderId) }, { is_deleted: false }] },
            },
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
                    from: 'stores',
                    localField: 'restaurant_id',
                    foreignField: '_id',
                    as: 'restaurant_id',
                },
            },
            { $unwind: { path: '$restaurant_id', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'items',
                    localField: 'item_id',
                    foreignField: '_id',
                    as: 'item_id',
                },
            },
            { $unwind: { path: '$item_id', preserveNullAndEmptyArrays: true } },
        ]);
        if (!order) {
            throw new common_1.HttpException('Order not found', common_1.HttpStatus.NOT_FOUND);
        }
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        const templateContent = fs.readFileSync('public/pdf.htm', 'utf8');
        const content = templateContent
            .replace('{{order-id}}', order._id)
            .replace('{{order-date}}', order.order_time)
            .replace('{{delivery_address}}', order.deliveryAddress)
            .replace('{{itemName}}', order.item_id.itemName)
            .replace('{{itemPrice}}', order.item_id.price)
            .replace('{{itemQuantity}}', order.item_id.quantity)
            .replace('{{delivery_fee}}', order.deliveryFee)
            .replace('{{tax}}', order.tax)
            .replace('{{payment_method}}', order.payment_method)
            .replace('{{card_number}}', order.card_number)
            .replace('{{total_amount}}', order.totalAmount)
            .replace('{{restaurant_name}}', order.restaurant_id.name)
            .replace('{{restaurant_contact}}', order.restaurant_id.contact_number)
            .replace('{{driver_name}}', order.driver_id.fullname)
            .replace('{{driver_contact}}', order.driver_id.contact_number)
            .replace('{{notes}}', order.note);
        await page.setContent(content);
        const outputPath = (0, path_1.join)(process.cwd(), `${Date.now()}.pdf`);
        await page.pdf({ path: outputPath, format: 'A4' });
        await browser.close();
        console.log('PDF generated successfully at', outputPath);
        return order;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], OrderService);
//# sourceMappingURL=order.service.js.map