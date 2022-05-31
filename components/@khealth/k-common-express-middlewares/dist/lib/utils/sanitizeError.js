"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeError = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * converts axios error to serializable object or return original error
 */
const sanitizeError = (error) => {
    if (axios_1.default.isAxiosError(error)) {
        const jsonError = error.toJSON();
        jsonError.config.data = '[REDACTED]';
        if (jsonError.config.headers) {
            if (jsonError.config.headers['Authorization']) {
                jsonError.config.headers['Authorization'] = '[REDACTED]';
            }
            if (jsonError.config.headers['authorization']) {
                jsonError.config.headers['authorization'] = '[REDACTED]';
            }
        }
        return jsonError;
    }
    return error;
};
exports.sanitizeError = sanitizeError;
//# sourceMappingURL=sanitizeError.js.map