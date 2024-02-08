import { Schema, SchemaFactory, Prop, raw } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './users.schema';
import { Address } from './address.schema';
import { Mode } from './modes.schema';

@Schema()
export class Driver {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Mode' })
  mode: Mode;

  @Prop(
    raw({
      govt_id_image: { type: String, required: false, default: '' },
      liscense_image: { type: String, required: false, default: '' },
      verified_picture: { type: String, required: false, default: '' },
      rc_image: { type: String, required: false, default: '' },
    }),
  )
  documents: Record<string, any>;

  @Prop(
    raw({
      weekly_order: { type: String, required: true, default: '0' },
      weekly_rating: { type: String, required: true, default: '0' },
      weekly_earning: { type: String, required: true, default: '0' },
      active_hours: { type: String, required: true, default: '0' },
    }),
  )
  statics: Record<string, any>;

  @Prop(
    raw({
      by_earning: { type: String, required: true, default: '0' },
      by_rating: { type: String, required: true, default: '0' },
      by_riding: { type: String, required: true, default: '0' },
    }),
  )
  driver_criteria: Record<string, any>;

  @Prop(
    raw({
      account_number: { type: String, required: true, default: '0' },
      IFC_code: { type: String, required: true, default: '0' },
      bank_name: { type: String, required: true, default: '0' },
    }),
  )
  bank_details: Record<string, any>;

  @Prop(
    raw({
      platform: { type: String },
      os: { type: String },
      browser: { type: String },
      ip: { type: String },
    }),
  )
  metadata: Record<string, any>;

  @Prop(
    raw({
      vehicle_number: { type: String, required: false },
      vehicle_issue_date: { type: String, required: false },
      vehicle_exp_date: { type: String, required: false },
      dl_number: { type: String, required: false },
      dl_issue_date: { type: String, required: false },
      dl_exp_date: { type: String, required: false },
    }),
  )
  vehicle_details: Record<string, any>;

  @Prop({ required: false })
  note: string;

  @Prop({ required: false })
  admin_note: string;

  @Prop({ required: true, default: Date.now() })
  created_at: Date;

  @Prop({ required: true, default: Date.now() })
  updated_at: Date;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Address.name }])
  address: Address[];
}

export type DriverSchemaType = mongoose.HydratedDocument<Driver>;

export const DriverSchema = SchemaFactory.createForClass(Driver);
