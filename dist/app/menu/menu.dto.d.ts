export declare class createMenuDto {
    name: string;
    store: string;
    mode: string;
    description: string;
    is_activated: boolean;
    note: string;
    admin_note: string;
}
export declare class PagingQueryDto {
    page_no: number;
    page_size: number;
}
export declare class updateMenuDto {
    name?: string;
    description?: string;
    is_activated?: boolean;
    note?: string;
    admin_note?: string;
}
