"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyHttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let MyHttpExceptionFilter = class MyHttpExceptionFilter {
    catch(exception, host) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const status = exception.getStatus();
        const exception_response = {
            isSuccess: false,
            statusCode: status,
            error: exception.message,
        };
        if (exception['response']) {
            exception['response'].message && (exception_response['message'] = exception['response'].message);
        }
        response.status(status).json({ ...exception_response });
    }
};
exports.MyHttpExceptionFilter = MyHttpExceptionFilter;
exports.MyHttpExceptionFilter = MyHttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], MyHttpExceptionFilter);
//# sourceMappingURL=exception.js.map