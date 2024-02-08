import { OrderService } from './order.service';
import { createOrderDto, PagingQueryDto, orderFilterDto, OrderUpdateDto } from './order.dto';
export declare class OrderController {
    private OrderService;
    private readonly logger;
    constructor(OrderService: OrderService);
    createUser(model: createOrderDto): Promise<import("../../models/order.schema").Order>;
    getAllUser(id: string, query: PagingQueryDto): Promise<import("../../models/order.schema").Order[]>;
    getById(orderId: string): Promise<import("../../models/order.schema").Order[]>;
    orderPdf(orderId: string): Promise<any>;
    softDelete(orderId: string): Promise<string>;
    orderUpdate(orderId: string, model: OrderUpdateDto): Promise<import("../../models/order.schema").Order | import("rxjs").Observable<import("../../models/order.schema").Order>>;
    searchCustomer(name: string): Promise<import("../../models/order.schema").Order[] | import("rxjs").Observable<import("../../models/order.schema").Order[]>>;
    filterCustomer(query: orderFilterDto): Promise<import("../../models/order.schema").Order[]>;
}
