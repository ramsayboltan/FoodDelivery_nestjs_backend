type menuModel = {
  [key in string]: any;
};

export const toMenu = (entity: menuModel): menuModel => {
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
    // name: entity.name,
    // description: entity.description,
    // note: entity.note,
    // is_activated: entity.is_activated,
    // admin_note: entity.admin_note,
  };
};
export const toSearchMenu = (entities: menuModel[]): menuModel[] => {
  return entities.map(entity => {
    return toMenu(entity);
  });
};
