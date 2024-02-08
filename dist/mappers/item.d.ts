type itemModel = {
    [key in string]: any;
};
export declare const toItem: (entity: itemModel) => itemModel;
export declare const toSearchModel: (entities: itemModel[]) => itemModel[];
export {};
