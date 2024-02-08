import { NestApplication } from '@nestjs/core';
export declare class SwaggerUIExtended {
    private readonly APP;
    private readonly config;
    private readonly swagger_design;
    constructor(app: NestApplication);
    create(): void | never;
}
