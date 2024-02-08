import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
export declare class MongoDBConnectionService implements MongooseOptionsFactory {
    private readonly configService;
    constructor(configService: ConfigService);
    createMongooseOptions(): MongooseModuleOptions;
}
export declare const db1: import("@nestjs/common").DynamicModule;
