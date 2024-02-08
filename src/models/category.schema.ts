import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Mode } from './modes.schema';
import mongoose from 'mongoose';
@Schema()
export class Category {
  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Mode' })
  mode: Mode;

  @Prop()
  fullname: string;

  @Prop()
  description: string;

  @Prop(
    raw({
      platform: { type: String },
      os: { type: String },
      browser: { type: String },
      ip: { type: String },
    }),
  )
  metadata: Record<string, any>;

  @Prop()
  avatar: string;

  @Prop({ default: true })
  is_activated: boolean;

  @Prop({ required: true, default: false })
  is_deleted: boolean;

  @Prop()
  note: string;

  @Prop()
  admin_note: string;

  @Prop({ required: true, default: Date.now() })
  created_at: Date;

  @Prop({ required: true, default: Date.now() })
  updated_at: Date;
}
export type CategorychemaType = HydratedDocument<Category>;
export const CategorySchema = SchemaFactory.createForClass(Category);
