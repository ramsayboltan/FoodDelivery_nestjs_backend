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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const address_schema_1 = require("../../models/address.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let AddressService = class AddressService {
    constructor(addressModel) {
        this.addressModel = addressModel;
    }
    async create(model) {
        const { user, country, state, city, address_line1, address_line2, is_activated, zip_code } = model;
        const address = await new this.addressModel({
            user,
            country,
            state,
            city,
            address_line1,
            address_line2,
            is_activated,
            zip_code,
        }).save();
        return address;
    }
    async createMany(addressArr) {
        const mappCallback = add => {
            return new this.addressModel({
                user: add.user,
                mode: add.mode,
                is_activated: add.is_activated,
                country: add.country,
                state: add.state,
                city: add.city,
                address_line1: add.address_line1,
                address_line2: add.address_line2,
                zip_code: add.zip_code,
                type: add.type,
            }).save();
        };
        const mappedData = [...addressArr].map(mappCallback);
        const allAddress = await Promise.all(mappedData);
        return allAddress;
    }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(address_schema_1.Address.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], AddressService);
//# sourceMappingURL=address.service.js.map