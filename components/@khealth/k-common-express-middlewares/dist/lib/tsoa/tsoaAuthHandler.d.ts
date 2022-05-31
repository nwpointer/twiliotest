import type { Request } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { AuthSession } from '../express/middleware';
/**
 * authentication handler to verify JWT bearer token,
 * returns jwtPayload with userId in case the user is authenticated,
 * otherwise throws {@link ErrorResponse} with status code 401
 */
export declare function tsoaAuthHandler(req: Request & AuthSession): JwtPayload;
/**
 * authentication handler to verify Ping JWT bearer token,
 * returns jwtPayload with userId in case the user is authenticated,
 * otherwise throws {@link ErrorResponse} with status code 401
 */
export declare function tsoaPingAuthHandler(req: Request & AuthSession): JwtPayload;
/**
 * tsoa authentication middleware for express
 * @example
 * ```js
 * ->@Security('bearer')
 * export class AccountController extends Controller {}
 * ```
 */
export declare function expressAuthentication(req: Request & AuthSession, securityName: string, scopes?: string[]): Promise<Express.UserContext>;
