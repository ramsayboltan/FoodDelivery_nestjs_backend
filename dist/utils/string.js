"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidString = void 0;
const isValidString = (val) => {
    if (val === null || val === undefined || val === '' || typeof val !== 'string') {
        return false;
    }
    return true;
};
exports.isValidString = isValidString;
//# sourceMappingURL=string.js.map