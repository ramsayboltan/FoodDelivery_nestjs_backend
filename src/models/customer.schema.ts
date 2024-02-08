import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './users.schema';
import { Address } from './address.schema';
import { Mode } from './modes.schema';
@Schema()
export class Customer {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Mode' })
  mode: Mode;

  @Prop({ default: '' })
  note: string;

  @Prop({ default: '' })
  admin_note: string;

  @Prop({ default: Date.now(), required: true })
  created_at: Date;

  @Prop({ default: Date.now(), required: true })
  updated_at: Date;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Address.name }])
  address: Address[];
}

export type CustomerSchemaType = mongoose.HydratedDocument<Customer>;

export const customerSchema = SchemaFactory.createForClass(Customer);
