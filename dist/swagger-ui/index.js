"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerUIExtended = void 0;
const swagger_1 = require("@nestjs/swagger");
class SwaggerUIExtended {
    constructor(app) {
        this.config = new swagger_1.DocumentBuilder()
            .setTitle(' ')
            .setDescription('The food app api')
            .setVersion('1.0')
            .build();
        this.swagger_design = {
            customCss: '.swagger-ui .topbar { display: none }',
            customSiteTitle: 'meander food app apis',
        };
        this.APP = app;
    }
    create() {
        const document = swagger_1.SwaggerModule.createDocument(this.APP, this.config);
        swagger_1.SwaggerModule.setup('api', this.APP, document, this.swagger_design);
    }
}
exports.SwaggerUIExtended = SwaggerUIExtended;
//# sourceMappingURL=index.js.map