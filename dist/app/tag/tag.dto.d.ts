export declare class createTagDto {
    tagname: string;
    mode: string;
    is_activated: boolean;
    tittle: string;
    display_name: string;
    description: string;
}
export declare class PagingQueryDto {
    page_no: number;
    page_size: number;
}
export declare class HeaderToken {
    ['x-access-token']: string;
}
export declare class TagUpdateDto {
    tagname: string;
    tittle: string;
    display_name: string;
    description: string;
}
export declare class tagFilterDto {
    is_active: string;
    is_inactive: string;
    sort_order: string;
    date_from: string;
    date_to: string;
}
