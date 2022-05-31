import type { JwtHeader, JwtPayload } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { Session } from 'express-session';
export declare function getSecretOrPublicKey(header: JwtHeader): Promise<string | undefined>;
export declare function getUserInfoFromRequest(req: Request & AuthSession, pingValidation: boolean): Promise<Express.UserContext>;
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
export declare function authHandler(req: Request & AuthSession, res: Response, next: NextFunction): Promise<void>;
/**
 * authentication middleware to verify JWT bearer token,
 * sets userId and jwtPayload to the req context in case an user is authenticated,
 * otherwise return status code 401
 * @requires PING_ENVIRONMENT_ID environment variable
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export declare function authPingHandler(req: Request & AuthSession, res: Response, next: NextFunction): Promise<void>;
/**
 * Synchronously verify given token using a secret or a public key to get a decoded token token -
 * JWT string to verify secretOrPublicKey - Either the secret for HMAC algorithms,
 * or the PEM encoded public key for RSA and ECDSA.
 * @throws
 * @param {string} token
 * @returns {JWT | never}
 */
export declare function decodeToken(token: string): Promise<JwtPayload | never>;
export declare type AuthSession = Session & {
    session: {
        tokens: {
            access_token: string;
        };
    };
};
/**
 * returns JWT bearer token from the authorization header
 * @throws
 * @param {Request} req
 * @returns {string | never}
 */
export declare function getAuthToken(req: Request & AuthSession): string | never;
