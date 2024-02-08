// export type documentFileType = {
//   rc_image: Express.Multer.File[];
//   liscense_image: Express.Multer.File[];
//   verfied_image: Express.Multer.File[];
//   adharcard_image: Express.Multer.File[];
//   buffer: Buffer;
//   fieldname: string;
//   originalname: string; // Add the originalname property
//   encoding: string;
//   mimetype: string;
//   size: number;
// };
export type uploadProfileImage = {
  rc_image: Express.Multer.File[];
  govt_id_image: Express.Multer.File[];
  liscense_image: Express.Multer.File[];
  verified_picture: Express.Multer.File[];
};

export type filterType = {
  is_active: string | boolean;
  is_inactive: string | boolean;
  date_from: string | Date;
  date_to: string | Date;
  sort_order: string | 'ascending' | 'descending';
};
