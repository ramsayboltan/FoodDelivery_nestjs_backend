"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.createHash = void 0;
const bcrypt = require("bcrypt");
const createHash = (payload) => {
    const hash = bcrypt.hashSync(payload, 10);
    return hash;
};
exports.createHash = createHash;
const compareHash = (hash_password, plain_password) => {
    const isMatched = bcrypt.compareSync(plain_password, hash_password);
    return isMatched;
};
exports.compareHash = compareHash;
//# sourceMappingURL=bcrypt.js.map