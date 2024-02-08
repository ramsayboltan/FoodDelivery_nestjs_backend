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
exports.ModesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const modes_schema_1 = require("../../models/modes.schema");
const string_1 = require("../../utils/string");
let ModesService = class ModesService {
    constructor(modeModel) {
        this.modeModel = modeModel;
    }
    async build(model) {
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
    async createMode(model) {
        const mode = await this.build(model);
        if (!mode) {
            throw new common_1.HttpException('mode not found', common_1.HttpStatus.BAD_REQUEST);
        }
        return mode;
    }
    async getAllMode(query) {
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
    async getById(id) {
        const mode = await this.modeModel.aggregate([
            {
                $match: { $and: [{ _id: new mongoose_1.Types.ObjectId(id) }, { is_deleted: false }] },
            },
        ]);
        return mode;
    }
    async updateMode(id, model) {
        const mode = await this.modeModel.findById({ _id: id });
        if (!mode) {
            throw new common_1.HttpException('mode not found', common_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, string_1.isValidString)(model.name)) {
            mode.name = model.name;
        }
        if ((0, string_1.isValidString)(model.display_name)) {
            mode.display_name = model.display_name;
        }
        if (model.is_activated) {
            mode.is_activated = model.is_activated;
        }
        if ((0, string_1.isValidString)(model.description)) {
            mode.description = model.description;
        }
        if ((0, string_1.isValidString)(model.note)) {
            mode.note = model.note;
        }
        if ((0, string_1.isValidString)(model.admin_note)) {
            mode.admin_note = model.admin_note;
        }
        await mode.save();
        return mode;
    }
    async DeleteMode(id) {
        const mode = await this.modeModel.findByIdAndUpdate({ _id: id }, {
            $set: {
                is_deleted: true,
            },
        });
        await mode.save();
        return mode;
    }
    async searchModes(query) {
        if (!query || typeof query !== 'string') {
            return [];
        }
        const modes = await this.modeModel.find({ name: { $regex: query, $options: 'i' } }).exec();
        return modes;
    }
};
exports.ModesService = ModesService;
exports.ModesService = ModesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(modes_schema_1.Mode.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ModesService);
//# sourceMappingURL=modes.service.js.map