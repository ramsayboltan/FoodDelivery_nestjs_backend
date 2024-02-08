import { Prop, Schema as NestSchema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Schema as MongoSchema } from 'mongoose';
import { Item } from './item.schema';
const { Types } = MongoSchema;
import mongoose from 'mongoose';
import { Mode } from './modes.schema';
// import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
// import * as mongoose from 'mongoose';
// import { HydratedDocument } from 'mongoose';
// import { Item } from './item.schema';

@NestSchema()
export class Addon {
  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Mode' })
  mode: Mode;

  @Prop({ type: Types.ObjectId, ref: 'Item' })
  itemId: Item;

  @Prop(
    raw({
      itemName: { type: String },
      description: { type: String },
      price: { type: String },
    }),
  )
  addon: Record<string, any>;
  // name: string;

  // @Prop()
  // description: string;

  // @Prop()
  // price: string;
  // @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Item' })
  // item: Item;

  @Prop(
    raw({
      name: { type: String },
      description: { type: String },
      price: { type: String },
    }),
  )
  addon_type: Record<string, any>;
  // name: string;

  // @Prop()
  // description: string;

  // @Prop()
  // price: string;

  // @Prop()
  image: string;

  @Prop({ require: true, default: 'false' })
  is_deleted: boolean;

  @Prop({ require: true, default: 'true' })
  is_activated: boolean;

  @Prop({ required: true, default: Date.now() })
  created_at: Date;

  @Prop({ required: true, default: Date.now() })
  updated_at: Date;
}

export const addonSchema = SchemaFactory.createForClass(Addon);
