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
exports.AddonService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const addon_schema_1 = require("../../models/addon.schema");
const moment = require("moment");
const toObjectId = mongoose_1.Types.ObjectId;
let AddonService = class AddonService {
    constructor(addonModel) {
        this.addonModel = addonModel;
    }
    async create(files, model) {
        let { addon } = model;
        const { itemId, mode } = model;
        addon && (addon = JSON.parse(addon.toString()));
        const [image] = files.image;
        const imageFilename = image.filename;
        const data = await new this.addonModel({
            itemId,
            mode,
            addon,
            image: imageFilename,
        }).save();
        return data;
    }
    async createMany(addonArr) {
        const mappCallback = add => {
            return new this.addonModel({
                itemId: add.itemId,
                mode: add.mode,
                addon: add.addon,
                image: add.image,
            }).save();
        };
        const mapperData = [...addonArr].map(mappCallback);
        const allAddon = await Promise.all(mapperData);
        return allAddon;
    }
    async build(files, model) {
        let { addon } = model;
        const { itemId, mode } = model;
        addon && (addon = JSON.parse(addon.toString()));
        const [image] = files.image;
        const imageFilename = image.filename;
        const data = await new this.addonModel({
            itemId,
            addon,
            mode,
            image: imageFilename,
        }).save();
        return data;
    }
    async createAddon(files, model) {
        const addon = await this.build(files, model);
        return addon;
    }
    async getAllAddon(id, queryParams) {
        let { page_number = '1', page_size = '50' } = queryParams;
        page_number = Number(page_number);
        page_size = Number(page_size);
        const skip = (page_number - 1) * page_size;
        const addon = await this.addonModel.aggregate([
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
                $lookup: {
                    from: 'modes',
                    localField: 'mode',
                    foreignField: '_id',
                    as: 'mode',
                },
            },
            {
                $lookup: {
                    from: 'items',
                    localField: 'itemId',
                    foreignField: '_id',
                    as: 'itemId',
                },
            },
            {
                $skip: skip,
            },
            {
                $limit: page_size,
            },
        ]);
        return addon;
    }
    async getByIdAddon(id) {
        const addon = (await this.addonModel.findById({ _id: id })).populate('itemId');
        return addon;
    }
    async updateAddon(id, model) {
        const addon = await this.addonModel.findByIdAndUpdate({ _id: id });
        if (!addon) {
            throw new common_1.HttpException('addon not found', common_1.HttpStatus.BAD_REQUEST);
        }
        if (model.addon) {
            addon.addon = model.addon;
        }
        await addon.save();
        return addon;
    }
    async searchAddon(name) {
        const customer = await this.addonModel.aggregate([
            {
                $match: {
                    is_deleted: false,
                    'addon.itemName': {
                        $regex: `.*${name}.*`,
                        $options: 'i',
                    },
                },
            },
            {
                $lookup: {
                    from: 'items',
                    localField: 'itemId',
                    foreignField: '_id',
                    as: 'itemId',
                },
            },
        ]);
        return customer;
    }
    async filterAddon(query) {
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
                    'addon.itemName': query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
                },
            };
            pipeline.push({ ...sorting });
        }
        const data = await this.addonModel.aggregate(pipeline);
        return data;
    }
    async deleteAddon(id) {
        const addon = await this.addonModel.findById({ _id: id });
        if (!addon) {
            throw new common_1.HttpException('addon not found', common_1.HttpStatus.BAD_REQUEST);
        }
        addon.is_deleted = true;
        await addon.save();
        return addon;
    }
};
exports.AddonService = AddonService;
exports.AddonService = AddonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(addon_schema_1.Addon.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], AddonService);
//# sourceMappingURL=addon.service.js.map