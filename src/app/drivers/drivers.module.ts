import { Module } from '@nestjs/common';
import { Driver, DriverSchema } from 'src/models/drivers.schema';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { User, UserSchema } from '../../models/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressModule } from '../address/address.module';

import { Address, addressSchema } from '@app/models/address.schema';

@Module({
  imports: [
    AddressModule,
    MongooseModule.forFeature([
      { name: Driver.name, schema: DriverSchema },
      { name: User.name, schema: UserSchema },
      { name: Address.name, schema: addressSchema },
    ]),
  ],
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}
