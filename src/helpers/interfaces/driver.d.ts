export interface driverInterface {
  user: string;
  documents: {
    govt_id_image: string;
    liscense: string;
    verified_picture: string;
    rc_image: string;
  };
  statics: {
    weekly_order: string;
    weeekly_rating: string;
    weekly_earning: string;
    active_hours: string;
  };
  metadata: {
    platform: string;
    os: string;
    ip: string;
    browser: string;
  };
  bank_details: {
    account_number: string;
    IFC_code: string;
    bank_name: string;
  };
  vehicle_details: {
    vehicle_number: string;
    vehicle_issue_date: string;
    vehicle_exp_date: string;
    dl_number: string;
    dl_issue_date: string;
    dl_exp_date: string;
  };
  note: string;
  admin_note: string;
}
// export interface DocumentFileType {
//   documents: {
//     adharcard: Express.Multer.File[];
//     liscense: Express.Multer.File[];
//     verified_picture: Express.Multer.File[];
//     rc_image: Express.Multer.File[];
//   };
// }
