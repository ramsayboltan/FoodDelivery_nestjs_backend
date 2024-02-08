import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestApplication } from '@nestjs/core';

export class SwaggerUIExtended {
  private readonly APP: NestApplication | null;

  private readonly config = new DocumentBuilder()
    .setTitle(' ')
    .setDescription('The food app api')
    .setVersion('1.0')
    .build();

  private readonly swagger_design = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'meander food app apis',
  };

  constructor(app: NestApplication) {
    this.APP = app;
  }

  public create(): void | never {
    const document = SwaggerModule.createDocument(this.APP, this.config);
    SwaggerModule.setup('api', this.APP, document, this.swagger_design);
  }
}
