export interface addonInterface {
  itemId: string;
  mode: string;
  is_activated: boolean;
  addon: {
    itemName: string;
    description: string;
    price: string;
  };
  item: string;
  name: string;
  description: string;
  price?: string;
  is_activated: boolean;

  updated_at: Date;
}
