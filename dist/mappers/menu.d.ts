type menuModel = {
    [key in string]: any;
};
export declare const toMenu: (entity: menuModel) => menuModel;
export declare const toSearchMenu: (entities: menuModel[]) => menuModel[];
export {};
