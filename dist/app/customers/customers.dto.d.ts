import { CreateAddressDtoForExtend } from '@app/app/address/address.dto';
export declare class CustomerAddressUpdateDto {
    type: string;
    is_activated: boolean;
    country: string;
    state: string;
    city: string;
    zip_code: string;
    address_line1?: string;
    address_line2?: string;
}
declare class Location {
    type?: string | 'Point';
    coordinates?: [number, number];
}
export declare class createCustomerDto {
    fullname: string;
    email: string;
    password: string;
    dob: Date;
    gender: string;
    location?: Location;
    mode: string;
    contact_number: string;
    alter_contact_number?: string;
    readonly note: string;
    readonly admin_note: string;
    readonly address: CreateAddressDtoForExtend[];
    is_activated: boolean;
}
export declare class updateUserDto {
    fullname: string;
    dob: Date;
    gender: string;
    location?: Location;
    contact_number: string;
    alter_contact_number?: string;
    is_activated?: boolean;
    email?: string;
    readonly note: string;
    readonly admin_note: string;
    address: CustomerAddressUpdateDto[];
}
export declare class deleteManyDto {
    customer_ids: string[];
}
export declare class PagingQueryDto {
    page_number: number;
    page_size: number;
}
export declare class customerFilterDto {
    is_active: string;
    is_inactive: string;
    sort_order: string;
    date_from: string;
    date_to: string;
}
export {};
