"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionLogger = exports.bindSessionLogger = exports.bindSessionLoggerContext = exports.getSessionLoggerContext = void 0;
const cls_hooked_1 = require("cls-hooked");
const k_common_logging_1 = __importDefault(require("@khealth/k-common-logging"));
const _1 = require(".");
const sessionLoggerContextName = '__SESSION_LOGGER_CONTEXT__';
/**
 * returns the session logger context if created
 */
const getSessionLoggerContext = () => {
    return cls_hooked_1.getNamespace(sessionLoggerContextName);
};
exports.getSessionLoggerContext = getSessionLoggerContext;
const bindNamespace = (ns) => {
    const sessionLoggerContextProvider = (req, res, next) => {
        ns.bindEmitter(req);
        ns.bindEmitter(res);
        ns.run(() => next());
    };
    return sessionLoggerContextProvider;
};
/**
 * creates session logger context and returns the middleware to bind the request and response
 */
const bindSessionLoggerContext = () => {
    const ns = cls_hooked_1.createNamespace(sessionLoggerContextName);
    return bindNamespace(ns);
};
exports.bindSessionLoggerContext = bindSessionLoggerContext;
/**
 * create the session logger context and add {@link requestLoggerMiddleware}
 */
const bindSessionLogger = (app) => {
    app.use(exports.bindSessionLoggerContext());
    return _1.requestLoggerMiddleware;
};
exports.bindSessionLogger = bindSessionLogger;
/**
 * returns a new logger with specified meta
 */
const getSessionLogger = (component) => {
    const session = exports.getSessionLoggerContext();
    const userId = session === null || session === void 0 ? void 0 : session.get('userId');
    return k_common_logging_1.default.getLogger(component, { user_id: userId });
};
exports.getSessionLogger = getSessionLogger;
//# sourceMappingURL=session-logger-context-middleware.js.map