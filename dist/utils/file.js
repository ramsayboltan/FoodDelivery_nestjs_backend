"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genrateFileName = void 0;
const path_1 = require("path");
const genrateFileName = (file) => {
    const ext_name = (0, path_1.extname)(file.originalname);
    const renamed = Date.now() + ext_name;
    return renamed;
};
exports.genrateFileName = genrateFileName;
//# sourceMappingURL=file.js.map