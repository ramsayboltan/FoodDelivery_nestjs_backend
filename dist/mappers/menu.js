"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSearchMenu = exports.toMenu = void 0;
const toMenu = (entity) => {
    return {
        owner: entity.store.owner,
        name: entity.store.name,
        email: entity.store.email,
        contact_number: entity.store.contact_number,
        open_time: entity.store.open_time,
        close_time: entity.store.close_time,
        description: entity.store.description,
        status: entity.store.status,
        avatar: entity.store.avatar,
        delivery_radius: entity.store.delivery_radius,
        address: entity.store.address,
        is_activated: entity.store.is_activated,
        note: entity.store.note,
        admin_note: entity.store.admin_note,
        best_sellar: entity.store.best_sellar,
        created_at: entity.created_at,
        updated_at: entity.updated_at,
    };
};
exports.toMenu = toMenu;
const toSearchMenu = (entities) => {
    return entities.map(entity => {
        return (0, exports.toMenu)(entity);
    });
};
exports.toSearchMenu = toSearchMenu;
//# sourceMappingURL=menu.js.map