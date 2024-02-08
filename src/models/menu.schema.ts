import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Store } from './store.schema';
import { Mode } from './modes.schema';

@Schema()
export class Menu {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Store' })
  store: Store;

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Mode' })
  mode: Mode;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  note: string;

  @Prop({ required: true, default: true })
  is_activated: boolean;

  @Prop({ required: false, default: false })
  is_deleted: boolean;

  @Prop()
  admin_note: string;

  @Prop({ default: Date.now(), required: true })
  created_at: Date;

  @Prop({ default: Date.now(), required: true })
  updated_at: Date;
}

export type MenuSchemaType = HydratedDocument<Menu>;
export const MenuScehma = SchemaFactory.createForClass(Menu);
