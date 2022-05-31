"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errorLogger = void 0;
const k_common_core_1 = require("@khealth/k-common-core");
const k_common_logging_1 = __importDefault(require("@khealth/k-common-logging"));
const logger = k_common_logging_1.default.getLogger('middlewares');
// error-handling middleware must be a last, after other app.use() and routes calls
// https://expressjs.com/en/guide/error-handling.html
/**
 * @deprecated
 */
function errorLogger(error, request, response, next) {
    logger.error('Unhandled exception has occurred', error);
    next(error);
}
exports.errorLogger = errorLogger;
/**
 * @deprecated
 */
function errorHandler(error, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) {
    if (k_common_core_1.Utils.isProductionEnvironment()) {
        res.status(500).send({ message: error.message });
    }
    else {
        res.status(500).send({ message: error.message, stack: error.stack });
    }
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-middleware.js.map