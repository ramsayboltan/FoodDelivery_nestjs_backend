declare class addon_item {
    name: string;
    description: string;
    price: string;
}
export declare class itemAddonDtoForExtend {
    addon: addon_item;
}
export declare class addon_images_dto {
    image: any;
}
export declare class createAddonDtoForExtend {
    name: string;
    description: string;
    price: string;
    is_activated: boolean;
    image: any;
}
export declare class createItemDto {
    itemName: string;
    menu: string;
    category: string;
    mode: string;
    status: string;
    itemDsc: string;
    avatar: any;
    quantity: string;
    price: string;
    vegetarian_type: string;
    is_activated?: boolean;
    addon: itemAddonDtoForExtend[];
    addon_images: any;
}
export declare class ItemUpdatedDto {
    itemName?: string;
    itemDsc?: string;
    status?: string;
    vegetarian_type: string;
    price?: string;
    note?: string;
    admin_note?: string;
    is_activated?: boolean;
}
export declare class PagingQueryDto {
    page_no: number;
    page_size: number;
}
export declare class itemDtoFilter {
    is_active: string;
    is_inactive: string;
    date_from: string;
    date_to: string;
    sort_order: string;
}
export declare class itemUploadDto {
    avatar: any;
}
export {};
