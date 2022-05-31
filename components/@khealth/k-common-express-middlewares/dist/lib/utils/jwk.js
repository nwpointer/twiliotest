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
exports.getJwkPublicKey = void 0;
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const assert_1 = require("assert");
const jwk = jwks_rsa_1.default({
    rateLimit: true,
    cache: true,
    jwksRequestsPerMinute: process.env.JWK_REQUEST_PER_MINUTE,
    jwksUri: `${process.env.PING_AUTH_URL || 'https://auth.pingone.com'}/${process.env.PING_ENVIRONMENT_ID}/as/jwks`
});
function getJwkPublicKey(kid) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = yield jwk.getSigningKey(kid);
        const signingKey = key.getPublicKey();
        assert_1.ok(signingKey, 'signingKey is undefined, please verify if PING_ENVIRONMENT_ID is valid');
        return signingKey;
    });
}
exports.getJwkPublicKey = getJwkPublicKey;
//# sourceMappingURL=jwk.js.map