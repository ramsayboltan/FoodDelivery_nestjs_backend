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
import { Model, Types } from 'mongoose';
import { Order } from '../../models/order.schema';
import { createOrderDto, orderFilterDto } from './order.dto';
import { Observable } from 'rxjs';
import { orderUpdateInterface } from '@app/helpers/interfaces/order.interface';
export declare class OrderService {
    private orderModel;
    constructor(orderModel: Model<Order>);
    build(model: createOrderDto): Promise<import("mongoose").Document<unknown, {}, Order> & Order & {
        _id: Types.ObjectId;
    }>;
    calculateFare(distance: string, perKilometerRate: string): string;
    createOrder(model: createOrderDto): Promise<Order>;
    getAllOrder(id: string, queryParams: any): Promise<Order[]>;
    getByIdOrder(id: string): Promise<Order[]>;
    getByCustomerId(id: string): Promise<Order[]>;
    getByDriverId(id: string): Promise<Order[]>;
    getByRestaurantId(id: string): Promise<Order[]>;
    softDelete<T>(id: T): Promise<string>;
    orderUpdate<T>(id: T | string, model: Partial<orderUpdateInterface>): Promise<Order | Observable<Order>>;
    searchOrder(name: any): Promise<Order[] | Observable<Order[]>>;
    filterOrder<T extends Partial<orderFilterDto>>(query: T): Promise<Order[]>;
    generatePDF(orderId: string): Promise<any>;
}
