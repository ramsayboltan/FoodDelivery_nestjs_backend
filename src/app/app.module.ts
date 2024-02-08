import { Module, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { db1 as databaseConnection } from '../connection/db';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module';
import configuration from '../config/server.configuration';
import { ModesModule } from './modes/modes.module';
import { DriversModule } from './drivers/drivers.module';
import { StoreModule } from './store/store.module';
import { AddressModule } from './address/address.module';
import { CategoriesModule } from './categories/categories.module';
import { ItemsModule } from './items/items.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { AddonModule } from './addon/addon.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { TagModule } from './tag/tag.module';
import { ContentManagementModule } from './content_management/content_management.module';

@Module({
  imports: [
    ModesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
      expandVariables: true,
    }),
    databaseConnection,
    UsersModule,
    CustomersModule,
    DriversModule,
    StoreModule,
    AddressModule,
    CategoriesModule,
    ItemsModule,
    SubCategoryModule,
    AddonModule,
    MenuModule,
    OrderModule,
    TagModule,
    ContentManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
