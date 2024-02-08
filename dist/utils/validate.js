"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert_into_objectid = exports.convert_multiple_ids = exports.isAllvalidMongoObjectIds = exports.isValidMongoObjectId = void 0;
const mongoose_1 = require("mongoose");
const ObjectId = mongoose_1.default.Types.ObjectId;
const isValidMongoObjectId = (str_id) => {
    return ObjectId.isValid(str_id);
};
exports.isValidMongoObjectId = isValidMongoObjectId;
const isAllvalidMongoObjectIds = (ids) => {
    const isAllValid = ids.map(id => (0, exports.isValidMongoObjectId)(id)).every(id => id === true);
    return isAllValid;
};
exports.isAllvalidMongoObjectIds = isAllvalidMongoObjectIds;
const convert_multiple_ids = (ids) => {
    return ids.map(id => new ObjectId(id));
};
exports.convert_multiple_ids = convert_multiple_ids;
const convert_into_objectid = (id) => {
    return new ObjectId(id);
};
exports.convert_into_objectid = convert_into_objectid;
//# sourceMappingURL=validate.js.map