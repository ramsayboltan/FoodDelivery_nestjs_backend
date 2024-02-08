type customerModel = {
  [key in string]: any;
};

export const toModel = (entity: customerModel): customerModel => {
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

export const toSearchModel = (entities: customerModel[]): customerModel[] => {
  return entities.map(entity => {
    return toModel(entity);
  });
};
