import { Schema, SchemaFactory, Prop, raw } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import mongoose from 'mongoose';
import { Mode } from './modes.schema';
@Schema()
class LocationField {
  @Prop({ required: false })
  type: number;

  @Prop({ required: false })
  coordinates: [number, number];
}

@Schema()
export class User {
  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Mode' })
  mode: Mode;

  @Prop({ trim: true })
  fullname: string;

  @Prop({ trim: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: true })
  is_activated: boolean;

  @Prop({ required: true })
  dob: Date;

  @Prop({ required: true })
  contact_number: string;

  @Prop({ required: false })
  alter_contact_number: string;

  @Prop({
    enum: ['female', 'male', 'other'],
    required: true,
  })
  gender: string;

  @Prop({
    required: false,
    trim: true,
  })
  avatar: string;

  @Prop({
    enum: ['admin', 'driver', 'customer'],
    required: true,
  })
  role: string;

  @Prop(
    raw({
      address: { type: String },
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number] },
    }),
  )
  location: Record<string, any>;

  @Prop(
    raw({
      platform: { type: String },
      os: { type: String },
      browser: { type: String },
      ip: { type: String },
    }),
  )
  metadata: Record<string, any>;

  @Prop({ required: false })
  token: string;

  @Prop({ required: false })
  device_token: string;

  @Prop({ required: true, default: false })
  is_deleted: boolean;

  @Prop({ required: true, default: Date.now() })
  created_at: Date;

  @Prop({ required: true, default: Date.now() })
  updated_at: Date;
}

export type UserSchemaType = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
