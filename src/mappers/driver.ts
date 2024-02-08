type driverModel = {
  [key in string]: any;
};

export const toDriver = (entity: driverModel): driverModel => {
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

export const toSearchDriver = (entities: driverModel[]): driverModel[] => {
  return entities.map(entity => {
    return toDriver(entity);
  });
};
