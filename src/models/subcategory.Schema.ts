import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import { Mode } from './modes.schema';
@Schema()
export class subCategory {
  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Mode' })
  mode: Mode;

  @Prop()
  name: string;

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
  image: string;

  @Prop()
  status: string;

  @Prop({ required: true, default: true })
  is_activated: boolean;

  @Prop({ required: false, default: false })
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

export type subCategorychemaType = HydratedDocument<subCategory>;
export const subCategorySchema = SchemaFactory.createForClass(subCategory);
