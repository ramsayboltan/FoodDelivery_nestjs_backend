interface: order.interface.ts;

export interface userInterface {
  restaurant_id: string;
  customer_id: string;
  driver_id: string;
  payment_method: string;
  expiry_Date: string;
  card_number: string;
  order_time: Date;
  deliveryFee: string;
  preparing_time: string;
  deliveryAddress: string;
  status: string;
  tax: string;
  totalAmount: string;
  note: string;
  admin_note: string;
  is_activated: boolean;
  created_at: Date;
  updated_at: Date;
}
