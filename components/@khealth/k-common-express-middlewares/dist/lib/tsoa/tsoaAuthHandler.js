"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressAuthentication = exports.tsoaPingAuthHandler = exports.tsoaAuthHandler = void 0;
const middleware_1 = require("../express/middleware");
const models_1 = require("../models");
const component = 'auth';
/**
 * authentication handler to verify JWT bearer token,
 * returns jwtPayload with userId in case the user is authenticated,
 * otherwise throws {@link ErrorResponse} with status code 401
 */
function tsoaAuthHandler(req) {
    try {
        const userInfo = middleware_1.getUserInfoFromRequest(req, false);
        middleware_1.getSessionLogger(component).info('User authenticated');
        return userInfo;
    }
    catch (error) {
        middleware_1.getSessionLogger(component).warn('Unable to authenticate', error);
        // should be handled in errorRequestHandler
        throw new models_1.ErrorResponse(error.message, 401);
    }
}
exports.tsoaAuthHandler = tsoaAuthHandler;
/**
 * authentication handler to verify Ping JWT bearer token,
 * returns jwtPayload with userId in case the user is authenticated,
 * otherwise throws {@link ErrorResponse} with status code 401
 */
function tsoaPingAuthHandler(req) {
    try {
        const userInfo = middleware_1.getUserInfoFromRequest(req, true);
        middleware_1.getSessionLogger(component).info('User authenticated');
        return userInfo;
    }
    catch (error) {
        middleware_1.getSessionLogger(component).warn('Unable to authenticate', error);
        // should be handled in errorRequestHandler
        throw new models_1.ErrorResponse(error.message, 401);
    }
}
exports.tsoaPingAuthHandler = tsoaPingAuthHandler;
/**
 * tsoa authentication middleware for express
 * @example
 * ```js
 * ->@Security('bearer')
 * export class AccountController extends Controller {}
 * ```
 */
function expressAuthentication(req, securityName, scopes) {
    var _a;
    if (securityName === 'bearer') {
        try {
            const user = tsoaAuthHandler(req);
            if (scopes) {
                if (scopes.includes('admin') && !((_a = user.userClaims) === null || _a === void 0 ? void 0 : _a.is_admin)) {
                    return Promise.reject(new models_1.ErrorResponse('Forbidden', 403));
                }
            }
            middleware_1.getSessionLogger(component).info('user authorized');
            return Promise.resolve(user);
        }
        catch (error) {
            return Promise.reject(error instanceof models_1.ErrorResponse
                ? error
                : new models_1.ErrorResponse('Unauthorized', 401));
        }
    }
    return Promise.reject(new models_1.ErrorResponse('Unauthorized', 401));
}
exports.expressAuthentication = expressAuthentication;
//# sourceMappingURL=tsoaAuthHandler.js.map