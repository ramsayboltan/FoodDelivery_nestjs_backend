"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSearchModel = exports.toModel = void 0;
const toModel = (entity) => {
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
        address: entity.address ?? [],
        is_activated: entity.user.is_activated,
        orders: entity.orders,
        created_at: entity.created_at,
        updated_at: entity.updated_at,
    };
};
exports.toModel = toModel;
const toSearchModel = (entities) => {
    return entities.map(entity => {
        return (0, exports.toModel)(entity);
    });
};
exports.toSearchModel = toSearchModel;
//# sourceMappingURL=customer.js.map