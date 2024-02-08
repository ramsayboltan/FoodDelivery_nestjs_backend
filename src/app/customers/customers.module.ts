import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { Customer, customerSchema } from 'src/models/customer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../models/users.schema';
import { AddressModule } from '../address/address.module';
import { Address, addressSchema } from '@app/models/address.schema';

@Module({
  imports: [
    AddressModule,
    MongooseModule.forFeature([
      { name: Customer.name, schema: customerSchema },
      { name: User.name, schema: UserSchema },
      { name: Address.name, schema: addressSchema },
    ]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
