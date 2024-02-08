"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModesModule = void 0;
const common_1 = require("@nestjs/common");
const modes_controller_1 = require("./modes.controller");
const modes_service_1 = require("./modes.service");
const mongoose_1 = require("@nestjs/mongoose");
const modes_schema_1 = require("../../models/modes.schema");
let ModesModule = class ModesModule {
};
exports.ModesModule = ModesModule;
exports.ModesModule = ModesModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: modes_schema_1.Mode.name, schema: modes_schema_1.ModeSchema }])],
        controllers: [modes_controller_1.ModesController],
        providers: [modes_service_1.ModesService, common_1.Logger],
    })
], ModesModule);
//# sourceMappingURL=modes.module.js.map