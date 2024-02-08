declare class Location {
    coordinates: [number, number];
    type: string;
}
export declare class createOrderDto {
    restaurant_id: string;
    customer_id: string;
    mode: string;
    driver_id: string;
    item_id: string;
    payment_method: string;
    distance: string;
    preparing_time: string;
    deliveryFee: string;
    deliveryAddress: string;
    tax: string;
    totalAmount: string;
    note: string;
    admin_note: string;
    location_to: Location;
    location_from: Location;
    perKilometerRate: string;
    fare: string;
    card_number: string;
    expiry_Date: string;
    order_time: Date;
    status: string;
    is_activated: boolean;
}
export declare class PagingQueryDto {
    page_no: number;
    page_size: number;
}
export declare class HeaderToken {
    ['x-access-token']: string;
}
export declare class OrderUpdateDto {
    restaurant_id?: string;
    customer_id?: string;
    mode?: string;
    driver_id?: string;
    item_id?: string;
    payment_method?: string;
    order_time?: Date;
    preparing_time: string;
    status?: string;
    distance?: string;
    deliveryFee: string;
    deliveryAddress: string;
    tax?: string;
    totalAmount?: string;
    note?: string;
    admin_note?: string;
    location_to?: Location;
    location_from?: Location;
    perKilometerRate?: string;
    fare?: string;
    card_number?: string;
    expiry_Date?: string;
    is_activated?: boolean;
}
export declare class orderFilterDto {
    is_active: string;
    is_inactive: string;
    sort_order: string;
    date_from: string;
    date_to: string;
}
export {};
