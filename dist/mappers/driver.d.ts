type driverModel = {
    [key in string]: any;
};
export declare const toDriver: (entity: driverModel) => driverModel;
export declare const toSearchDriver: (entities: driverModel[]) => driverModel[];
export {};
