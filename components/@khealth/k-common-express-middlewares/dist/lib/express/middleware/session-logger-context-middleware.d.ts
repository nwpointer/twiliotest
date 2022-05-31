import type { Namespace } from 'cls-hooked';
import type { Logger } from 'winston';
import type { RequestHandler, Express } from 'express';
/**
 * returns the session logger context if created
 */
export declare const getSessionLoggerContext: () => Namespace | undefined;
/**
 * creates session logger context and returns the middleware to bind the request and response
 */
export declare const bindSessionLoggerContext: () => RequestHandler;
/**
 * create the session logger context and add {@link requestLoggerMiddleware}
 */
export declare const bindSessionLogger: (app: Express) => RequestHandler;
/**
 * returns a new logger with specified meta
 */
export declare const getSessionLogger: (component: string) => Logger;
