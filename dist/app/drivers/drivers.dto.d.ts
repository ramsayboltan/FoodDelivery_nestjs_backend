import { createUserDto, UserUpdateDto } from '../users/users.dto';
import { CreateAddressDtoForExtend } from '@app/app/address/address.dto';
export declare class driverAddressUpdateDto {
    type: string;
    is_activated: boolean;
    country: string;
    state: string;
    city: string;
    zip_code: string;
    address_line1?: string;
    address_line2?: string;
}
declare class driver_criteria {
    by_earning: string;
    by_rating: string;
    by_riding: string;
}
declare class Bank_dto {
    account_number: string;
    IFC_code: string;
    bank_name: string;
}
declare class Static_dto {
    weekly_order: string;
    weekly_rating: string;
    weekly_earning: string;
    active_hours: string;
}
declare class Vehicle_detail {
    vehicle_number: string;
    vehicle_issue_date: string;
    vehicle_exp_date: string;
    dl_number: string;
    dl_issue_date: string;
    dl_exp_date: string;
}
export declare class PagingQueryDto {
    page_number: number;
    page_size: number;
}
export declare class Document_dto {
    liscense_image: any;
    govt_id_image: any;
    verified_picture: any;
    rc_image: any;
}
declare const createDriverDto_base: import("@nestjs/common").Type<Partial<createUserDto>>;
export declare class createDriverDto extends createDriverDto_base {
    mode: string;
    note: string;
    admin_note: string;
    bank_details: Bank_dto;
    statics: Static_dto;
    driver_criteria: driver_criteria;
    vehicle_details: Vehicle_detail;
    liscense_image: any;
    govt_id_image: any;
    verified_picture: any;
    rc_image: any;
    address: CreateAddressDtoForExtend[];
}
declare const updateDriverDto_base: import("@nestjs/common").Type<Partial<UserUpdateDto>>;
export declare class updateDriverDto extends updateDriverDto_base {
    statics?: Static_dto;
    vehicle_details?: Vehicle_detail;
    driver_criteria?: driver_criteria;
    bank_details?: Bank_dto;
    note?: string;
    admin_note?: string;
    is_activated?: boolean;
    address: driverAddressUpdateDto[];
}
export declare class DriverFileUploadDto {
    liscense_image: any;
    govt_id_image: any;
    verified_picture: any;
    rc_image: any;
}
export declare class driverFilterDto {
    is_active: string;
    is_inactive: string;
    by_earning: string;
    by_rating: string;
    by_riding: string;
    sort_order: string;
}
export {};
