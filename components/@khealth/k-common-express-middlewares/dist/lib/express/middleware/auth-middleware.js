"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthToken = exports.decodeToken = exports.authPingHandler = exports.authHandler = exports.getUserInfoFromRequest = exports.getSecretOrPublicKey = void 0;
const assert_1 = require("assert");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const session_logger_context_middleware_1 = require("./session-logger-context-middleware");
const jwk_1 = require("../../utils/jwk");
const component = "auth";
function getUserContext(payload, accessToken) {
    var _a;
    const context = session_logger_context_middleware_1.getSessionLoggerContext();
    if (context) {
        context.set("userId", (_a = payload["identity"]) !== null && _a !== void 0 ? _a : "UNKNOWN");
    }
    const userId = payload["identity"];
    const userClaims = payload["user_claims"];
    assert_1.ok(userId, "Identity is undefined");
    return Object.assign(Object.assign({}, payload), { userClaims,
        accessToken,
        userId });
}
function getPingUserContext(payload, accessToken) {
    const sub = payload["sub"];
    const kangpyId = payload["kangpyId"];
    const userId = kangpyId ? kangpyId : sub;
    const context = session_logger_context_middleware_1.getSessionLoggerContext();
    if (context) {
        context.set("userId", userId);
    }
    assert_1.ok(userId, "sub is undefined");
    const userClaims = {};
    return Object.assign(Object.assign({}, payload), { userId,
        userClaims,
        accessToken });
}
function getSecretOrPublicKey(header) {
    return __awaiter(this, void 0, void 0, function* () {
        const alg = header.alg;
        const kid = header.kid;
        switch (alg) {
            case "RS256":
                return kid
                    ? yield jwk_1.getJwkPublicKey(kid)
                    : process.env.ASYMMETRIC_PUBLIC_KEY;
            case "HS256":
                return process.env.SECRET_KEY;
            default:
                return undefined;
        }
    });
}
exports.getSecretOrPublicKey = getSecretOrPublicKey;
function getUserInfoFromRequest(req, pingValidation) {
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = getAuthToken(req);
        const payload = yield decodeToken(accessToken);
        if (pingValidation) {
            return getPingUserContext(payload, accessToken);
        }
        return getUserContext(payload, accessToken);
    });
}
exports.getUserInfoFromRequest = getUserInfoFromRequest;
/**
 * authentication middleware to verify JWT bearer token,
 * sets userId and jwtPayload to the req context in case an user is authenticated,
 * otherwise return status code 401
 * @requires ASYMMETRIC_PUBLIC_KEY
 * @requires SECRET_KEY
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function authHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            req.user = yield getUserInfoFromRequest(req, false);
            session_logger_context_middleware_1.getSessionLogger(component).info("User authenticated");
            next();
        }
        catch (error) {
            session_logger_context_middleware_1.getSessionLogger(component).warn("Unable to authenticate", error);
            res.status(401).json({ error: error.message });
        }
    });
}
exports.authHandler = authHandler;
/**
 * authentication middleware to verify JWT bearer token,
 * sets userId and jwtPayload to the req context in case an user is authenticated,
 * otherwise return status code 401
 * @requires PING_ENVIRONMENT_ID environment variable
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function authPingHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            req.user = yield getUserInfoFromRequest(req, true);
            session_logger_context_middleware_1.getSessionLogger(component).info("User authenticated");
            next();
        }
        catch (error) {
            session_logger_context_middleware_1.getSessionLogger(component).warn("Unable to authenticate", error);
            res.status(401).json({ error: error.message });
        }
    });
}
exports.authPingHandler = authPingHandler;
/**
 * Synchronously verify given token using a secret or a public key to get a decoded token token -
 * JWT string to verify secretOrPublicKey - Either the secret for HMAC algorithms,
 * or the PEM encoded public key for RSA and ECDSA.
 * @throws
 * @param {string} token
 * @returns {JWT | never}
 */
function decodeToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const { header } = jsonwebtoken_1.default.decode(token, {
            complete: true,
        });
        const alg = header.alg;
        const secretOrPublicKey = yield getSecretOrPublicKey(header);
        assert_1.ok(secretOrPublicKey, `No suitable secrets to parse the encoded ${alg} token`);
        return jsonwebtoken_1.default.verify(token, secretOrPublicKey, {
            algorithms: [alg],
        });
    });
}
exports.decodeToken = decodeToken;
/**
 * returns JWT bearer token from the authorization header
 * @throws
 * @param {Request} req
 * @returns {string | never}
 */
function getAuthToken(req) {
    var _a, _b;
    if ((_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.tokens) === null || _b === void 0 ? void 0 : _b.access_token) {
        return req.session.tokens.access_token;
    }
    const authHeader = req.headers.authorization;
    assert_1.ok(authHeader, "No authorization token found");
    if (authHeader.startsWith("Bearer ")) {
        const [, authToken] = authHeader.split(" ");
        return authToken;
    }
    return authHeader;
}
exports.getAuthToken = getAuthToken;
//# sourceMappingURL=auth-middleware.js.map