"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const exception_1 = require("./helpers/errors/exception");
const config_1 = require("@nestjs/config");
const cookieParser = require("cookie-parser");
const swagger_ui_1 = require("./swagger-ui");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const APP_PORT = configService.get('PORT');
    const SESSION_SECRET = configService.get('SESSION_SECRET');
    const session_instance = session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    });
    const validation_pipe_instance = new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    });
    app.enableCors();
    app.use(cookieParser());
    app.use(session_instance);
    app.useGlobalPipes(validation_pipe_instance);
    app.useGlobalFilters(new exception_1.MyHttpExceptionFilter());
    new swagger_ui_1.SwaggerUIExtended(app).create();
    const port = parseInt(APP_PORT) || 3000;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map