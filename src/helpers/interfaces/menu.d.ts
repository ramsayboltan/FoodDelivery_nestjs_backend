export interface menuinterface {
  store?: Types.ObjectId;
  name?: string;
  description?: string;
  note?: string;
  admin_note?: string;
  is_activated?: boolean;
  updated_at?: Date;
}
