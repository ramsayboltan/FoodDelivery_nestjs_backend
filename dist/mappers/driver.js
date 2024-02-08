"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSearchDriver = exports.toDriver = void 0;
const toDriver = (entity) => {
    return {
        fullname: entity.user.fullname,
        email: entity.user.email,
        location: entity.user.location,
        dob: entity.user.dob,
        gender: entity.user.gender,
        id: entity.user._id,
        admin_note: entity.admin_note,
        note: entity.note,
        avatar: entity.user.avatar,
        contact_number: entity.user.contact_number,
        documents: entity.documents,
        statics: entity.statics,
        driver_criteria: entity.driver_criteria,
        bank_details: entity.bank_details,
        vehicle_details: entity.vehicle_details,
        is_activated: entity.user.is_activated,
        address: entity.address ?? [],
        orders: entity.orders,
        created_at: entity.created_at,
        updated_at: entity.updated_at,
    };
};
exports.toDriver = toDriver;
const toSearchDriver = (entities) => {
    return entities.map(entity => {
        return (0, exports.toDriver)(entity);
    });
};
exports.toSearchDriver = toSearchDriver;
//# sourceMappingURL=driver.js.map