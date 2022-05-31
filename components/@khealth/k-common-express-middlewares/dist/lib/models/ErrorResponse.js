"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
/**
 * an error containing a message to display in response and a status code
 * @example
 * ```json
 * {"error": "Internal Server Error"}
 * ```
 */
class ErrorResponse extends Error {
    constructor(error, status, details) {
        super(error);
        this.error = error;
        this.status = status;
        this.details = details;
    }
}
exports.ErrorResponse = ErrorResponse;
//# sourceMappingURL=ErrorResponse.js.map