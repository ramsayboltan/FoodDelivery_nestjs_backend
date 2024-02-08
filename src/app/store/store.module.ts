import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { Store, storeSchema } from 'src/models/store.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forFeature([{ name: Store.name, schema: storeSchema }])],
  providers: [StoreService],
  controllers: [StoreController],
})
export class StoreModule {}
