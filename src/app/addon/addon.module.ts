import { Module, Global, Logger } from '@nestjs/common';
import { AddonController } from './addon.controller';
import { AddonService } from './addon.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { Addon, addonSchema } from '../../models/addon.schema';

// @Global()
// @Module({
//   imports: [MongooseModule.forFeature([{ name: Addon.name, schema: addonSchema }])],

import { Addon, addonSchema } from '../../models/addon.schema';
import { Item, ItemSchema } from '@app/models/item.schema';
import { ItemsService } from '../items/items.service';
import { ItemsModule } from '../items/items.module';

// @Global()
@Module({
  imports: [
    // ItemsModule,
    MongooseModule.forFeature([
      { name: Addon.name, schema: addonSchema },
      { name: Item.name, schema: ItemSchema },
    ]),
  ],
  controllers: [AddonController],
  providers: [AddonService, ItemsService],
  exports: [AddonService],
})
export class AddonModule {}
