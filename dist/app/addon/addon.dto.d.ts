export declare class addon_dto {
    itemName: string;
    description: string;
    price: string;
}
export declare class CreateAddonDtoForExtend {
    addon: addon_dto;
    image: any;
    is_activated: boolean;
}
export declare class CreateAddonDto {
    itemId: string;
    mode: string;
    addon: addon_dto;
    image: any;
    is_activated: boolean;
}
export declare class PagingQueryDto {
    page_number: number;
    page_size: number;
}
export declare class updateAddonDto {
    addon?: addon_dto;
}
export declare class addonFilterDto {
    is_active: string;
    is_inactive: string;
    sort_order: string;
    date_from: string;
    date_to: string;
}
