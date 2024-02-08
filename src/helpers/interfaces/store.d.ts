import { Types } from 'mongoose';
// import {OpeningClosingTime } from '../'
export interface OpeningClosingTime {
  open: Date;
  close: Date;
  status: 'open' | 'close';
}

export interface storeInterface {
  name: string;
  email: string;
  contact_number: string;
  description: string;
  owner: string | Record<string, any> | Record<string, any>[];
  opening_closing: {
    monday: OpeningClosingTime;
    tuesday: OpeningClosingTime;
    wednesday: OpeningClosingTime;
    thursday: OpeningClosingTime;
    friday: OpeningClosingTime;
    saturday: OpeningClosingTime;
    sunday: OpeningClosingTime;
  };
  bank_details: {
    account_number: string;
    IFC_code: string;
    bank_name: string;
  };
  metadata?: {
    platform: string;
    os: string;
    browser: string;
    ip: string;
  };
  delivery_radius: number;
  avatar?: string;
  location: {
    coordinates?: [number, number];
    address?: string;
  };
  website: string;
  is_activated?: boolean;
  bestSeller?: boolean;
  note?: string;
  admin_note?: string;

  address?: {
    country: string;
    state: string;
    city: string;
    zip_code: string;
    address_line1: string;
    address_line2: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
