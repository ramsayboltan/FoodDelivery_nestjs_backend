import { Schema, SchemaFactory, Prop, raw } from '@nestjs/mongoose';
// import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Menu } from './menu.schema';
import { Category } from './category.schema';
import { Addon } from './addon.schema';
import { Mode } from './modes.schema';

@Schema()
export class Item {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Menu' })
  menu: Menu;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Mode' })
  mode: Mode;

  @Prop()
  itemName: string;

  @Prop()
  itemDsc: string;

  // @Prop()
  // sku: string;

  @Prop(
    raw({
      platform: { type: String },
      os: { type: String },
      browser: { type: String },
      ip: { type: String },
    }),
  )
  metadata: Record<string, any>;

  @Prop({
    enum: ['veg', 'non_veg'],
  })
  vegetarian_type: string;

  @Prop({ required: true, default: 'true' })
  is_activated: boolean;

  @Prop({ required: true, default: false })
  is_deleted: boolean;

  @Prop()
  avatar: string;

  @Prop()
  quantity: string;

  // @Prop()
  // subject: string;

  @Prop()
  price: string;

  @Prop()
  status: string;

  // @Prop()
  // discount: string;

  @Prop({ required: false })
  note: string;

  @Prop({ required: false })
  admin_note: string;

  @Prop({ required: true, default: Date.now() })
  created_at: Date;

  @Prop({ required: true, default: Date.now() })
  updated_at: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Addon.name })
  addon: Addon[];
}

export type ItemSchemaType = mongoose.HydratedDocument<Item>;
export const ItemSchema = SchemaFactory.createForClass(Item);
