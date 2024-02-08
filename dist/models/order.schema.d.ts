/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import mongoose, { HydratedDocument } from 'mongoose';
import { Store } from './store.schema';
import { Item } from './item.schema';
import { User } from './users.schema';
import { Mode } from './modes.schema';
export declare class Order {
    restaurant_id: Store;
    customer_id: User;
    driver_id: User;
    item_id: Item;
    mode: Mode;
    payment_method: string;
    card_number: string;
    expiry_Date: string;
    order_time: Date;
    distance: string;
    preparing_time: string;
    location_from: Record<string, any>;
    location_to: Record<string, any>;
    fare: string;
    perKilometerRate: string;
    deliveryFee: string;
    deliveryAddress: string;
    tax: string;
    totalAmount: string;
    note: string;
    admin_note: string;
    is_activated: boolean;
    is_deleted?: boolean;
    status: string;
    created_at: Date;
    updated_at: Date;
}
export type OrderSchemaType = HydratedDocument<Order>;
export declare const OrderSchema: mongoose.Schema<Order, mongoose.Model<Order, any, any, any, mongoose.Document<unknown, any, Order> & Order & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Order, mongoose.Document<unknown, {}, mongoose.FlatRecord<Order>> & mongoose.FlatRecord<Order> & {
    _id: mongoose.Types.ObjectId;
}>;
