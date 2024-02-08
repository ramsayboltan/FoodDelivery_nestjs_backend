type itemModel = {
  [key in string]: any;
};

export const toItem = (entity: itemModel): itemModel => {
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

export const toSearchModel = (entities: itemModel[]): itemModel[] => {
  return entities.map(entity => {
    return toItem(entity);
  });
};
