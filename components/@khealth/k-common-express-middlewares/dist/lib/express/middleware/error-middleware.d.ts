import type { NextFunction, Request, Response } from 'express';
/**
 * @deprecated
 */
export declare function errorLogger(error: Error, request: Request, response: Response, next: NextFunction): void;
/**
 * @deprecated
 */
export declare function errorHandler(error: Error, req: Request, res: Response, next: NextFunction): void;
