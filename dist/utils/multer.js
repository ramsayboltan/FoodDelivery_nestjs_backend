"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerDiskUploader = void 0;
const multer_1 = require("multer");
const multerDiskUploader = dest => {
    return (0, multer_1.diskStorage)({
        destination: dest,
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname.replace(/ /g, ''));
        },
    });
};
exports.multerDiskUploader = multerDiskUploader;
//# sourceMappingURL=multer.js.map