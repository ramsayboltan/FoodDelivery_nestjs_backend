import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { User } from './users.schema';
import mongoose from 'mongoose';
import { Mode } from './modes.schema';
@Schema()
export class Store {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;
  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Mode' })
  mode: Mode;
  @Prop({ required: true, default: false })
  is_deleted?: boolean;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  contact_number: string;

  @Prop(
    raw({
      account_number: { type: String, required: true, default: '0' },
      IFC_code: { type: String, required: true, default: '0' },
      bank_name: { type: String, required: true, default: '0' },
    }),
  )
  bank_details: Record<string, any>;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  avatar: string;

  @Prop({ required: false })
  website: string;

  @Prop(
    raw({
      country: { type: String, required: false },
      state: { type: String, required: false },
      city: { type: String, required: false },
      zip_code: { type: String, required: false },
      address_line1: { type: String, required: false },
      address_line2: { type: String, required: false },
    }),
  )
  address: Record<string, any>;

  @Prop(
    raw({
      monday: {
        open: { required: false, type: Date },
        close: { required: false, type: Date },
        status: {
          type: String,
          enum: ['open', 'close'],
          required: true,
        },
      },
      tuesday: {
        open: { required: false, type: Date },
        close: { required: false, type: Date },
        status: {
          type: String,
          enum: ['open', 'close'],
          required: true,
        },
      },
      wednesday: {
        open: { required: false, type: Date },
        close: { required: false, type: Date },
        status: {
          type: String,
          enum: ['open', 'close'],
          required: true,
        },
      },
      thursday: {
        open: { required: false, type: Date },
        close: { required: false, type: Date },
        status: {
          type: String,
          enum: ['open', 'close'],
          required: true,
        },
      },
      friday: {
        open: { required: false, type: Date },
        close: { required: false, type: Date },
        status: {
          type: String,
          enum: ['open', 'close'],
          required: true,
        },
      },
      saturday: {
        open: { required: false, type: Date },
        close: { required: false, type: Date },
        status: {
          type: String,
          enum: ['open', 'close'],
          required: true,
        },
      },
      sunday: {
        open: { required: false, type: Date },
        close: { required: false, type: Date },
        status: {
          type: String,
          enum: ['open', 'close'],
          required: true,
        },
      },
    }),
  )
  opening_closing: Record<string, { open: Date; close: Date; status: 'open' | 'close' }>;

  @Prop({ required: false })
  delivery_radius: number;

  @Prop({ required: true, default: true })
  is_activated: boolean;

  @Prop({ required: true, default: Date.now() })
  updated_at: Date;

  @Prop({ required: true, default: Date.now() })
  created_at: Date;

  @Prop({ required: false, default: '' })
  note: string;

  @Prop({ required: false, default: '' })
  admin_note: string;

  @Prop({ required: false, default: false })
  best_selller: boolean;

  @Prop(
    raw({
      platform: {
        type: String,
      },
      ip: {
        type: String,
      },
      os: {
        type: String,
      },
      browser: {
        type: String,
      },
    }),
  )
  metadata: Record<string, any>;

  @Prop(
    raw({
      address: { type: String },
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number] },
    }),
  )
  location: Record<string, any>;
}
export type storeSchemaType = mongoose.HydratedDocument<Store>;

export const storeSchema = SchemaFactory.createForClass(Store);
