import { ValidationPipe } from '@nestjs/common';
import { NestFactory, NestApplication } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MyHttpExceptionFilter } from './helpers/errors/exception';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { SwaggerUIExtended } from './swagger-ui';
import * as session from 'express-session';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const APP_PORT = configService.get<string>('PORT');
  const SESSION_SECRET = configService.get<string>('SESSION_SECRET');

  const session_instance = session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  });

  const validation_pipe_instance = new ValidationPipe({
    whitelist: true,
    transform: true,
  });

  // ^ global middlewares
  app.enableCors();

  app.use(cookieParser());
  app.use(session_instance);

  app.useGlobalPipes(validation_pipe_instance);
  app.useGlobalFilters(new MyHttpExceptionFilter());

  // * swagger documentations
  new SwaggerUIExtended(app).create();

  // ~^listening the server
  const port = parseInt(APP_PORT) || 3000;
  await app.listen(port);
}
bootstrap();
