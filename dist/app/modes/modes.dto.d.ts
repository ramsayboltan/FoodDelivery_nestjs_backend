export declare class createModeDto {
    name: string;
    display_name: string;
    description: string;
    is_activated: boolean;
    note: string;
    admin_note: string;
}
export declare class PagingQueryDto {
    page_number: number;
    page_size: number;
}
export declare class ModeUpdateDto {
    name?: string;
    display_name?: string;
    description?: string;
    note?: string;
    admin_note?: string;
    is_activated?: boolean;
}
