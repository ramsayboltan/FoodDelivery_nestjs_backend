declare class Location {
    coordinates: [number, number];
    address: string;
}
declare class OpeningClosingTime {
    open: Date;
    close: Date;
    status: 'open' | 'close';
}
declare class Address_Dto {
    country: string;
    state: string;
    city: string;
    zip_code: string;
    address_line1: string;
    address_line2: string;
}
declare class bank_details_dto {
    account_number: string;
    IFC_code: string;
    bank_name: string;
}
declare class opening_closing_dto {
    monday: OpeningClosingTime;
    tuesday: OpeningClosingTime;
    wednesday: OpeningClosingTime;
    thursday: OpeningClosingTime;
    friday: OpeningClosingTime;
    saturday: OpeningClosingTime;
    sunday: OpeningClosingTime;
}
export declare class PagingQueryDto {
    page_no: number;
    page_size: number;
}
export declare class createStoreDto {
    name: string;
    email: string;
    contact_number: string;
    opening_closing: opening_closing_dto;
    bank_details: bank_details_dto;
    description: string;
    owner: string;
    delivery_radius: number;
    website: string;
    note: string;
    mode: string;
    admin_note: string;
    location: Location;
    address: Address_Dto;
}
export declare class updateStoreDto {
    name?: string;
    email?: string;
    contact_number?: string;
    description?: string;
    delivery_radius?: number;
    website?: string;
    opening_closing?: opening_closing_dto;
    note?: string;
    admin_note?: string;
    is_activated?: boolean;
    loaction?: Location;
    address?: Address_Dto;
}
export declare class UploadImageDto {
    image: any;
}
export {};
