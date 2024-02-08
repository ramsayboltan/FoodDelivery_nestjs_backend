import { Schema, SchemaFactory, Prop, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import { Mode } from './modes.schema';
@Schema()
export class Tag {
  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Mode' })
  mode: Mode;

  @Prop()
  tagname: string;

  @Prop()
  tittle: string;

  @Prop()
  display_name: string;

  @Prop()
  description: string;

  @Prop({ required: true, default: false })
  is_deleted: boolean;

  @Prop({ required: true, default: true })
  is_activated: boolean;

  @Prop({ required: true, default: Date.now() })
  created_at: Date;

  @Prop({ required: true, default: Date.now() })
  updated_at: Date;
}
export type TagSchemaType = HydratedDocument<Tag>;

export const TagSchema = SchemaFactory.createForClass(Tag);
