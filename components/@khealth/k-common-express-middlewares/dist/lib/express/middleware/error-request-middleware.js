"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorRequestHandler = void 0;
const models_1 = require("../../models");
const tsoa_1 = require("tsoa");
/**
 * error request handler to format express, tsoa errors for response
 */
const errorRequestHandler = (error, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    var _a;
    /** setting the error to be logged in {@link requestLoggerMiddleware} */
    res.locals.error = error;
    if (error instanceof tsoa_1.ValidateError) {
        return res.status(error.status).json({
            error: 'Validation Failed',
            details: error.fields,
        });
    }
    if (models_1.isStatusError(error)) {
        return res.status(error.status).json({
            error: (_a = error.message) !== null && _a !== void 0 ? _a : `Error status code ${error.status}`,
            details: error.details,
        });
    }
    res.status(500).json({
        error: 'Internal Server Error',
    });
};
exports.errorRequestHandler = errorRequestHandler;
//# sourceMappingURL=error-request-middleware.js.map