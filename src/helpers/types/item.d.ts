export type documentsFileType = {
  avatar: Express.Multer.File[];
  addon_images: Express.Multer.File[];
};

export type pagingQueryType = {
  page_number: string | number | '1';
  page_size: string | number | '50';
};
