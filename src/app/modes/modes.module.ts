import { Module, Logger } from '@nestjs/common';
import { ModesController } from './modes.controller';
import { ModesService } from './modes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Mode, ModeSchema } from '../../models/modes.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Mode.name, schema: ModeSchema }])],
  controllers: [ModesController],
  providers: [ModesService, Logger],
})
export class ModesModule {}
