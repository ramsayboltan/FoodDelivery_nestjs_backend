declare class Location {
    coordinates: [number, number];
    address: string;
}
export declare class createUserDto {
    is_activated?: boolean;
    fullname: string;
    email: string;
    password: string;
    dob: Date;
    gender: string;
    mode: string;
    location: Location;
    contact_number: string;
    alter_contact_number?: string;
    role: string;
}
export declare class PagingQueryDto {
    page_no: number;
    page_size: number;
}
export declare class HeaderToken {
    ['x-access-token']: string;
}
export declare class LoginModel {
    email: string;
    password: string;
}
export declare class UserUpdateDto {
    fullname?: string;
    contact_number?: string;
    altr_contact_number?: string;
    dob?: Date;
    gender?: string;
    is_activated?: boolean;
    location: Location;
}
export declare class fileUploadDto {
    image: any;
}
export {};
