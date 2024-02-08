export type customerFilterType = {
  is_active: string | boolean;
  is_inactive: string | boolean;
  date_from: string | Date;
  date_to: string | Date;
  sort_order: string | 'ascending' | 'descending';
};
