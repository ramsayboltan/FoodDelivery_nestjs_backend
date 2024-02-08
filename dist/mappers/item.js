"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSearchModel = exports.toItem = void 0;
const toItem = (entity) => {
    return {
        itemName: entity.itemName,
        itemDsc: entity.itemDsc,
        vegetarian_type: entity.vegetarian_type,
        price: entity.price,
        status: entity.status,
        note: entity.note,
        admin_note: entity.admin_note,
        avatar: entity.avatar,
        id: entity._id,
        addon: entity.addon,
        is_activated: entity.is_activated,
        menu: entity.menu,
        category: entity.category,
        created_at: entity.created_at,
        updated_at: entity.updated_at,
    };
};
exports.toItem = toItem;
const toSearchModel = (entities) => {
    return entities.map(entity => {
        return (0, exports.toItem)(entity);
    });
};
exports.toSearchModel = toSearchModel;
//# sourceMappingURL=item.js.map