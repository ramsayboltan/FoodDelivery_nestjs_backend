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
var OrderController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const swagger_1 = require("@nestjs/swagger");
const order_dto_1 = require("./order.dto");
const auth_guard_1 = require("../../helpers/guards/auth.guard");
const respone_interceptor_1 = require("../../helpers/interceptors/respone.interceptor");
const response_message_1 = require("../../helpers/decorators/response.message");
let OrderController = OrderController_1 = class OrderController {
    constructor(OrderService) {
        this.OrderService = OrderService;
        this.logger = new common_1.Logger(OrderController_1.name);
    }
    createUser(model) {
        return this.OrderService.createOrder(model);
    }
    getAllUser(id, query) {
        const data = this.OrderService.getAllOrder(id, query);
        return data;
    }
    async getById(orderId) {
        const order = await this.OrderService.getByIdOrder(orderId);
        return order;
    }
    async orderPdf(orderId) {
        try {
            const data = await this.OrderService.generatePDF(orderId);
            return data;
        }
        catch (error) {
            console.error('Error generating PDF:', error);
            throw new common_1.HttpException('PDF generation failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async softDelete(orderId) {
        const order = await this.OrderService.softDelete(orderId);
        return order;
    }
    orderUpdate(orderId, model) {
        return this.OrderService.orderUpdate(orderId, model);
    }
    async searchCustomer(name) {
        const data = await this.OrderService.searchOrder(name);
        return data;
    }
    async filterCustomer(query) {
        const data = await this.OrderService.filterOrder(query);
        return data;
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('user created.'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.createOrderDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('/getall/:id'),
    (0, common_1.UseGuards)(auth_guard_1.TokenAuthGuard),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    (0, response_message_1.ResponseMessage)('orders fetched.'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_dto_1.PagingQueryDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getAllUser", null);
__decorate([
    (0, common_1.Get)('/getById/:id'),
    (0, common_1.UseGuards)(auth_guard_1.TokenAuthGuard),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('fetched successfully.'),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('/getByIdPdf/:id'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "orderPdf", null);
__decorate([
    (0, common_1.Put)('/softDelete/:id'),
    (0, common_1.UseGuards)(auth_guard_1.TokenAuthGuard),
    (0, common_1.UseInterceptors)(respone_interceptor_1.MessageResponseInterceptor),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "softDelete", null);
__decorate([
    (0, common_1.Put)('/update/:id'),
    (0, common_1.UseGuards)(auth_guard_1.TokenAuthGuard),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, response_message_1.ResponseMessage)('order updated.'),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_dto_1.OrderUpdateDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "orderUpdate", null);
__decorate([
    (0, common_1.Get)('/search'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "searchCustomer", null);
__decorate([
    (0, common_1.Get)('/filter'),
    (0, common_1.UseInterceptors)(respone_interceptor_1.ResponseInterceptor),
    (0, swagger_1.ApiHeader)({
        name: 'x-access-token',
        description: 'Please enter access token',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.orderFilterDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "filterCustomer", null);
exports.OrderController = OrderController = OrderController_1 = __decorate([
    (0, common_1.Controller)('order'),
    (0, swagger_1.ApiTags)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map