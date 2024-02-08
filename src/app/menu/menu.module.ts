import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { StoreService } from '../store/store.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, storeSchema } from '@app/models/store.schema';
import { StoreModule } from '../store/store.module';
import { Menu, MenuScehma } from '@app/models/menu.schema';
@Module({
  imports: [
    StoreModule,
    MongooseModule.forFeature([
      { name: Menu.name, schema: MenuScehma },
      { name: Store.name, schema: storeSchema },
    ]),
  ],
  controllers: [MenuController],
  providers: [MenuService, StoreService],
})
export class MenuModule {}
