import { Prop, Schema as NestSchema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Schema as MongoSchema } from 'mongoose';
const { Types } = MongoSchema;
import mongoose from 'mongoose';
import { Mode } from './modes.schema';

@NestSchema()
export class Address {
  @Prop({ type: Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Mode' })
  mode: Mode;

  @Prop({
    enum: ['home', 'office', 'others'],
    required: false,
  })
  type: string;

  @Prop()
  country: string;

  @Prop()
  state: string;

  @Prop()
  city: string;

  @Prop()
  zip_code: string;

  @Prop()
  address_line1: string;

  @Prop()
  address_line2: string;

  @Prop({ default: Date.now() })
  updated_at: Date;

  @Prop({ default: Date.now() })
  created_at: Date;
}

export const addressSchema = SchemaFactory.createForClass(Address);
