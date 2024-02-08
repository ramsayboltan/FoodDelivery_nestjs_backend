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
Object.defineProperty(exports, "__esModule", { value: true });
exports.db1 = exports.MongoDBConnectionService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
let MongoDBConnectionService = class MongoDBConnectionService {
    constructor(configService) {
        this.configService = configService;
    }
    createMongooseOptions() {
        return {
            uri: this.configService.get('MONGO_URI'),
            retryAttempts: 5,
            retryDelay: 5,
        };
    }
};
exports.MongoDBConnectionService = MongoDBConnectionService;
exports.MongoDBConnectionService = MongoDBConnectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MongoDBConnectionService);
exports.db1 = mongoose_1.MongooseModule.forRootAsync({
    imports: [config_1.ConfigModule],
    useClass: MongoDBConnectionService,
});
//# sourceMappingURL=db.js.map