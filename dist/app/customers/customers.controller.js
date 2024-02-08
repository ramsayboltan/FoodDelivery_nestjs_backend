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
exports.CustomersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const customers_dto_1 = require("./customers.dto");
const customers_service_1 = require("./customers.service");
const respone_interceptor_1 = require("../../helpers/interceptors/respone.interceptor");
const response_message_1 = require("../../helpers/decorators/response.message");
const customer_1 = require("../../mappers/customer");
let CustomersController = class CustomersController {
    constructor(customerService) {
        this.customerService = customerService;
    }
    createCustomer(body) {
        return this.customerService.createCustomer(body);
    }
    async getAllCustomer(id, query) {
        const data = await this.customerService.getAllCustomer(id, query);
        return data;
    }
    async searchCustomer(name) {
        const data = await this.customerService.searchCustomer(name);
        return (0, customer_1.toSearchModel)(data);
    }
    async getById(id) {
        const data = await this.customerService.getById(id);
        return (0, customer_1.toModel)(data);
    }
    updateCustomer(id, model) {
        return this.customerService.updateCustomer(id, model);
    }
    async remove(id) {
        const data = await this.customerService.remove(id);
        return data;
    }
    async deleteManyCustomer(model) {
        const data = await this.customerService.removeManyCustomer(model.customer_ids);
        return data;
    }
    async filterCustomer(query) {
        const data = await this.customerService.filterCustomer(query);
        return (0, customer_1.toSearchModel)(data);
    }
    async updateAddress(body, id) {
        const data = await this.customerService.updateAddress(id, body);
        return data;
    }
};
exports.CustomersController = CustomersController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('customer created'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customers_dto_1.createCustomerDto]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Get)('/getall/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('customer fetched.'),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, customers_dto_1.PagingQueryDto]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "getAllCustomer", null);
__decorate([
    (0, common_1.Get)('/search'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "searchCustomer", null);
__decorate([
    (0, common_1.Get)('/getById/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('customer fetched.'),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)('/update/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.MessageResponseInterceptor),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, customers_dto_1.updateUserDto]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "updateCustomer", null);
__decorate([
    (0, common_1.Delete)('/remove/:id'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.MessageResponseInterceptor),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)('/deleteMany'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.MessageResponseInterceptor),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customers_dto_1.deleteManyDto]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "deleteManyCustomer", null);
__decorate([
    (0, common_1.Get)('/filter'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customers_dto_1.customerFilterDto]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "filterCustomer", null);
__decorate([
    (0, common_1.Put)('/update/address/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customers_dto_1.CustomerAddressUpdateDto, String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "updateAddress", null);
exports.CustomersController = CustomersController = __decorate([
    (0, swagger_1.ApiTags)('customers'),
    (0, common_1.Controller)('customers'),
    __metadata("design:paramtypes", [customers_service_1.CustomersService])
], CustomersController);
//# sourceMappingURL=customers.controller.js.map