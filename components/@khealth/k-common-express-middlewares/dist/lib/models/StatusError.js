"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStatusError = void 0;
/**
 * StatusError guard type function
 */
const isStatusError = (error) => 'status' in error;
exports.isStatusError = isStatusError;
//# sourceMappingURL=StatusError.js.map