import type { NextFunction, Request, Response } from 'express';
/**
 * middleware to log the request and response metadata.
 * attaches an error to the response log if presented in `response.locals.error`
 *
 * to log correct ip addresses set `app.set('trust proxy', true)` for express app
 */
export declare const requestLoggerMiddleware: (request: Request, response: Response, next: NextFunction) => void;
