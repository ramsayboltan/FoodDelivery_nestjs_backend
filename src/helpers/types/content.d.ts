export type documentesFileType = {
  banner1: Express.Multer.File[];
  banner2: Express.Multer.File[];
  banner3: Express.Multer.File[];
  banner4: Express.Multer.File[];
};
export type pagingQueryType = {
  page_number: string | number | '1';
  page_size: string | number | '50';
};
