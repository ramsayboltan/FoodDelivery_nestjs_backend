import { Schema, SchemaFactory, Prop, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Customer } from './customer.schema';
import { Driver } from './drivers.schema';
import { Store } from './store.schema';
import { Item } from './item.schema';
import { User } from './users.schema';
import { Mode } from './modes.schema';
@Schema()
export class Order {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Store.name })
  restaurant_id: Store;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  customer_id: User;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  driver_id: User;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Item' })
  item_id: Item;

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Mode' })
  mode: Mode;

  @Prop({ required: true })
  payment_method: string;

  @Prop({ required: true })
  card_number: string;

  @Prop({ required: true })
  expiry_Date: string;

  @Prop({ required: true, default: Date.now() })
  order_time: Date;

  @Prop({ required: true })
  distance: string;

  @Prop()
  preparing_time: string;

  @Prop(
    raw({
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number] },
    }),
  )
  location_from: Record<string, any>;
  @Prop(
    raw({
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number] },
    }),
  )
  location_to: Record<string, any>;

  @Prop({ required: true })
  fare: string;

  @Prop({ required: false })
  perKilometerRate: string;

  @Prop({ required: false })
  deliveryFee: string;

  @Prop({ required: true })
  deliveryAddress: string;

  @Prop({ required: false })
  tax: string;

  @Prop({ required: false })
  totalAmount: string;

  @Prop({ required: false })
  note: string;

  @Prop({ required: false })
  admin_note: string;

  @Prop({ required: true, default: true })
  is_activated: boolean;

  @Prop({ required: true, default: false })
  is_deleted?: boolean;

  @Prop({ default: 'active', enum: ['active', 'delivered', 'cancel'] })
  status: string;

  @Prop({ required: true, default: Date.now() })
  created_at: Date;

  @Prop({ required: true, default: Date.now() })
  updated_at: Date;
}

export type OrderSchemaType = HydratedDocument<Order>;

export const OrderSchema = SchemaFactory.createForClass(Order);
// OrderSchema.index({ location_from: '2dsphere' });
// OrderSchema.index({ location_to: '2dsphere' });
