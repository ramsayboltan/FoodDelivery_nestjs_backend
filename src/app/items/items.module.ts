import { Module, Logger, Global } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
// import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from '@app/models/item.schema';
import { Addon, addonSchema } from '@app/models/addon.schema';

// import { Addon, AddonSchema } from '@app/models/addon.schema';
// ""
import { AddonModule } from '../addon/addon.module';
@Module({
  imports: [
    AddonModule,
    MongooseModule.forFeature([
      { name: Item.name, schema: ItemSchema },
      { name: Addon.name, schema: addonSchema },

      //       { name: Addon.name, schema: AddonSchema },
      // ""
    ]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService, Logger],
  exports: [ItemsService],
})
export class ItemsModule {}
