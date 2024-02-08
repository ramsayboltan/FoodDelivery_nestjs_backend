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
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const item_schema_1 = require("../../models/item.schema");
const string_1 = require("../../utils/string");
const addon_schema_1 = require("../../models/addon.schema");
const addon_service_1 = require("../addon/addon.service");
const moment = require("moment");
const toObjectId = mongoose_1.Types.ObjectId;
let ItemsService = class ItemsService {
    constructor(itemModel, addonModel, addonService) {
        this.itemModel = itemModel;
        this.addonModel = addonModel;
        this.addonService = addonService;
    }
    async build(files, model) {
        const { menu, mode, quantity, category, itemName, itemDsc, price, status, vegetarian_type } = model;
        const [avatar] = files;
        const avatarFilename = avatar.filename;
        const item = await new this.itemModel({
            menu,
            category,
            mode,
            quantity,
            itemName,
            itemDsc,
            vegetarian_type,
            price,
            status,
            avatar: avatarFilename,
        }).save();
        return item;
    }
    async createItem(files, model, addon_images) {
        const item = await this.build(files, model);
        if (model.addon.length > 0) {
            const mappedAddon = JSON.parse(model.addon).map((add, i) => {
                return {
                    item: item._id.toString(),
                    image: addon_images[i].filename,
                    name: add.name,
                    description: add.description,
                    price: add.price,
                    is_activated: add.is_activated,
                };
            });
            const addon_resp = await this.addonService.createMany([...mappedAddon]);
            item['addon'] = [...addon_resp].map(doc => doc._id);
        }
        const data = await new this.itemModel(item).save();
        return data;
    }
    async getAll(id, query) {
        let { page_no = '1', page_size = '50' } = query;
        page_no = Number(page_no);
        page_size = Number(page_size);
        const skip = (page_no - 1) * page_size;
        const data = await this.itemModel.aggregate([
            {
                $match: {
                    $and: [
                        { mode: new toObjectId(id) },
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
                $lookup: {
                    from: 'addons',
                    localField: 'addon',
                    foreignField: '_id',
                    as: 'addon',
                },
            },
            {
                $lookup: {
                    from: 'menus',
                    localField: 'menu',
                    foreignField: '_id',
                    as: 'menu',
                },
            },
            {
                $unwind: {
                    path: '$menu',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'stores',
                    localField: 'menu.store',
                    foreignField: '_id',
                    as: 'menu.store',
                },
            },
            {
                $unwind: {
                    path: '$menu.store',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category',
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
    async getByIdMode(id) {
        const [mode] = await this.itemModel.aggregate([
            {
                $match: {
                    mode: new toObjectId(id),
                },
            },
            {
                $lookup: {
                    from: 'modes',
                    localField: 'mode',
                    foreignField: '_id',
                    as: 'mode',
                },
            },
            {
                $lookup: {
                    from: 'addons',
                    localField: 'addon',
                    foreignField: '_id',
                    as: 'addon',
                },
            },
            {
                $lookup: {
                    from: 'menus',
                    localField: 'menu',
                    foreignField: '_id',
                    as: 'menu',
                },
            },
            {
                $unwind: {
                    path: '$menu',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'stores',
                    localField: 'menu.store',
                    foreignField: '_id',
                    as: 'menu.store',
                },
            },
            {
                $unwind: {
                    path: '$menu.store',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category',
                },
            },
        ]);
        return mode;
    }
    async getByIdItem(id) {
        const [item] = await this.itemModel.aggregate([
            {
                $match: { _id: new mongoose_1.Types.ObjectId(id) },
            },
            {
                $match: {
                    is_deleted: false,
                },
            },
            {
                $lookup: {
                    from: 'addons',
                    localField: 'addon',
                    foreignField: '_id',
                    as: 'addon',
                },
            },
            {
                $lookup: {
                    from: 'menus',
                    localField: 'menu',
                    foreignField: '_id',
                    as: 'menu',
                },
            },
            {
                $unwind: {
                    path: '$menu',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'stores',
                    localField: 'menu.store',
                    foreignField: '_id',
                    as: 'menu.store',
                },
            },
            {
                $unwind: {
                    path: '$menu.store',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category',
                },
            },
        ]);
        return item;
    }
    async updateItem(id, model) {
        const item = await this.itemModel.findByIdAndUpdate({ _id: id });
        if (!item) {
            throw new common_1.HttpException('item not found', common_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, string_1.isValidString)(model.itemName)) {
            item.itemName = model.itemName;
        }
        if ((0, string_1.isValidString)(model.itemDsc)) {
            item.itemDsc = model.itemDsc;
        }
        if (model.is_activated) {
            item.is_activated = model.is_activated;
        }
        if ((0, string_1.isValidString)(model.price)) {
            item.price = model.price;
        }
        if ((0, string_1.isValidString)(item.vegetarian_type)) {
            item.vegetarian_type = model.vegetarian_type;
        }
        if ((0, string_1.isValidString)(model.status)) {
            item.status = model.status;
        }
        if ((0, string_1.isValidString)(model.note)) {
            item.note = model.note;
        }
        if ((0, string_1.isValidString)(model.admin_note)) {
            item.admin_note = model.admin_note;
        }
        await item.save();
        return item;
    }
    async deleteItem(id) {
        const item = await this.itemModel.findByIdAndUpdate({ _id: id }, {
            $set: {
                is_deleted: true,
            },
        });
        await item.save();
        return item;
    }
    async searchItem(name) {
        const customer = await this.itemModel.aggregate([
            {
                $match: {
                    is_deleted: false,
                    itemName: {
                        $regex: `.*${name}.*`,
                        $options: 'i',
                    },
                },
            },
            {
                $match: {
                    is_deleted: false,
                },
            },
            {
                $lookup: {
                    from: 'addons',
                    localField: 'addon',
                    foreignField: '_id',
                    as: 'addon',
                },
            },
            {
                $lookup: {
                    from: 'menus',
                    localField: 'menu',
                    foreignField: '_id',
                    as: 'menu',
                },
            },
            {
                $unwind: {
                    path: '$menu',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'stores',
                    localField: 'menu.store',
                    foreignField: '_id',
                    as: 'menu.store',
                },
            },
            {
                $unwind: {
                    path: '$menu.store',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category',
                },
            },
        ]);
        return customer;
    }
    async filterItem(query) {
        const is_active = JSON.parse(query.is_active);
        const is_inactive = JSON.parse(query.is_inactive);
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
                    itemName: query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
                },
            };
            pipeline.push({ ...sorting });
        }
        const data = await this.itemModel.aggregate(pipeline);
        return data;
    }
    async uploadProfileImage(id, file) {
        const item = await this.itemModel.findById({ _id: id });
        if (!item) {
            throw new common_1.HttpException(`item not found`, common_1.HttpStatus.BAD_REQUEST);
        }
        item.avatar = file.filename;
        await item.save();
        return 'image upload';
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(item_schema_1.Item.name)),
    __param(1, (0, mongoose_2.InjectModel)(addon_schema_1.Addon.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        addon_service_1.AddonService])
], ItemsService);
//# sourceMappingURL=items.service.js.map