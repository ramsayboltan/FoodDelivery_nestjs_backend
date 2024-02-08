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
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const menu_schema_1 = require("../../models/menu.schema");
const mongoose_2 = require("@nestjs/mongoose");
const string_1 = require("../../utils/string");
const store_schema_1 = require("../../models/store.schema");
const store_service_1 = require("../store/store.service");
const mongoose_3 = require("mongoose");
const ObjectId = mongoose_3.Types.ObjectId;
let MenuService = class MenuService {
    constructor(menuModel, storeModel, storeService) {
        this.menuModel = menuModel;
        this.storeModel = storeModel;
        this.storeService = storeService;
    }
    async createMenu(model) {
        const existingStore = await this.storeModel.findOne({
            is_deleted: false,
        });
        console.log(existingStore);
        if (!existingStore) {
            throw new common_1.HttpException('Store does not exist', common_1.HttpStatus.BAD_REQUEST);
        }
        const menu_payload = {
            store: new ObjectId(model.store),
            mode: new ObjectId(model.mode),
            name: model.name,
            note: model.note,
            admin_note: model.admin_note,
            description: model.description,
        };
        const menu = await new this.menuModel(menu_payload).save();
        return menu;
    }
    async getAllMenu(id, queryParams) {
        let { page_no = '1', page_size = '50' } = queryParams;
        page_no = Number(page_no);
        page_size = Number(page_size);
        const skip = (page_no - 1) * page_size;
        const menu = await this.menuModel.aggregate([
            {
                $match: {
                    $and: [
                        { mode: new mongoose_3.Types.ObjectId(id) },
                        {
                            is_deleted: false,
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'stores',
                    localField: 'store',
                    foreignField: '_id',
                    as: 'store',
                },
            },
            {
                $unwind: '$store',
            },
            {
                $skip: skip,
            },
            {
                $limit: page_size,
            },
        ]);
        return menu;
    }
    async getByIdMenu(id) {
        const [menu] = await this.menuModel.aggregate([
            {
                $match: { $and: [{ _id: new mongoose_3.Types.ObjectId(id) }, { is_deleted: false }] },
            },
            {
                $lookup: {
                    from: 'stores',
                    localField: 'store',
                    foreignField: '_id',
                    as: 'store',
                },
            },
            {
                $unwind: '$store',
            },
        ]);
        return menu;
    }
    async updateMenu(id, model) {
        const menu = await this.menuModel.findByIdAndUpdate({ _id: id });
        if (!menu) {
            throw new common_1.HttpException('menu not found', common_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, string_1.isValidString)(model.name)) {
            menu.name = model.name;
        }
        if ((0, string_1.isValidString)(model.description)) {
            menu.description = model.description;
        }
        if ((0, string_1.isValidString)(model.note)) {
            menu.note = model.note;
        }
        if ((0, string_1.isValidString)(model.admin_note)) {
            menu.admin_note = model.admin_note;
        }
        await menu.save();
        return menu;
    }
    async deleteMenu(id) {
        const menu = await this.menuModel.findByIdAndUpdate({ _id: id }, {
            $set: {
                is_deleted: true,
            },
        });
        if (!menu) {
            throw new common_1.HttpException(`menu not found`, common_1.HttpStatus.BAD_REQUEST);
        }
        return 'menu deleted';
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(menu_schema_1.Menu.name)),
    __param(1, (0, mongoose_2.InjectModel)(store_schema_1.Store.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        store_service_1.StoreService])
], MenuService);
//# sourceMappingURL=menu.service.js.map