type customerModel = {
    [key in string]: any;
};
export declare const toModel: (entity: customerModel) => customerModel;
export declare const toSearchModel: (entities: customerModel[]) => customerModel[];
export {};
