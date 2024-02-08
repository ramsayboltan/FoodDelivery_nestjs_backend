import { IsLatitude, IsLongitude } from 'class-validator';

export interface userInterface {
  restaurant_id: string;
  customer_id: string;
  driver_id: string;
  item_id: string;
  mode: string;
  payment_method: string;
  preparing_time: string;
  deliveryFee: string;
  deliveryAddress: string;
  tax: string;
  totalAmount: string;
  note: string;
  admin_note: string;
  card_number: string;
  order_time: Date;
  status: string;
  is_activated: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface orderInterface {
  Location: {
    latitude: number;
    longitude: number;
  };
}

export interface orderUpdateInterface {
  restaurant_id: any;
  customer_id: any;
  driver_id: any;
  item_id: any;
  mode: any;
  card_number: string;
  deliveryFee: string;
  deliveryAddress: string;
  tax: string;
  totalAmount: string;
  preparing_time: string;
  note: string;
  admin_note: string;
  distance: string;
  perKilometerRate: string;
  expiry_Date: string;
  fare: string;
  payment_method: string;
  order_time: any;
  status: string;
  is_activated: boolean;
  location_from: any;
  location_to: any;
}

export interface orderpdfinterface {
  order_time: any;
  location: any;
}
