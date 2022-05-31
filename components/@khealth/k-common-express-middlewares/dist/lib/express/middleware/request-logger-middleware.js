"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLoggerMiddleware = void 0;
const utils_1 = require("../../utils");
const session_logger_context_middleware_1 = require("./session-logger-context-middleware");
const getLogStatus = (statusCode) => {
    if (statusCode >= 500) {
        return 'error';
    }
    else if (statusCode >= 400) {
        return 'warn';
    }
    return 'info';
};
/**
 * middleware to log the request and response metadata.
 * attaches an error to the response log if presented in `response.locals.error`
 *
 * to log correct ip addresses set `app.set('trust proxy', true)` for express app
 */
const requestLoggerMiddleware = (request, response, next) => {
    const startTime = Date.now();
    const context = {
        query: request.query,
        params: request.params,
        status: undefined,
        userAgent: request.header('user-agent'),
        ips: request.ips,
    };
    session_logger_context_middleware_1.getSessionLogger('request').info(`${request.method} ${request.path}`, context);
    response.on('finish', () => {
        const responseLogger = session_logger_context_middleware_1.getSessionLogger('response');
        const finishTime = Date.now() - startTime;
        const message = `${request.method} ${request.path} - ${response.statusCode} ${finishTime}ms`;
        const level = getLogStatus(response.statusCode);
        context.status = response.statusCode;
        if (response.locals.error) {
            responseLogger.log(level, message, 
            // merge all properties to one error object
            Object.assign(utils_1.sanitizeError(response.locals.error), context));
        }
        else {
            responseLogger.log(level, message, context);
        }
    });
    next();
};
exports.requestLoggerMiddleware = requestLoggerMiddleware;
//# sourceMappingURL=request-logger-middleware.js.map