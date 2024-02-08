import { Module, Logger, Global } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { User, UserSchema } from '../../models/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { Tag, TagSchema } from '@app/models/tag.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
    JwtModule.register({
      global: true,
      secret: 'qwerty123456',
    }),
    // AddressModule,
  ],
  controllers: [TagController],
  providers: [TagService, Logger],
  exports: [TagService],
})
export class TagModule {}
