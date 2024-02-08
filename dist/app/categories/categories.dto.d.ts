export declare class createCategoryDto {
    fullname: string;
    description: string;
    mode: string;
    avatar: any;
    is_activated: boolean;
    note: string;
    admin_note: string;
}
export declare class PagingQueryDto {
    page_no: number;
    page_size: number;
}
export declare class updateCategoryDto {
    fullname?: string;
    description?: string;
    note?: string;
    admin_note?: string;
    is_activated?: boolean;
}
export declare class categoryUploadDto {
    avatar: any;
}
export declare class categoryDtoFilter {
    is_active: string;
    is_inactive: string;
    sort_order: string;
    date_from: string;
    date_to: string;
}
