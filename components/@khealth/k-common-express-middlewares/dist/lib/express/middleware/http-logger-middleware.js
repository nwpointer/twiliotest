"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLogger = void 0;
const k_common_core_1 = require("@khealth/k-common-core");
const k_common_logging_1 = __importDefault(require("@khealth/k-common-logging"));
const morgan_1 = __importDefault(require("morgan"));
const logger = k_common_logging_1.default.getLogger('http');
// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream = {
    write: (message) => logger.info(message),
};
// skip HTTP logs for any production evns.
const skip = () => {
    return k_common_core_1.Utils.isProductionEnvironment();
};
/**
 * Build the morgan middleware
 * @deprecated
 */
exports.httpLogger = morgan_1.default(':method :url :status :res[content-length] - :response-time ms', { stream, skip });
//# sourceMappingURL=http-logger-middleware.js.map