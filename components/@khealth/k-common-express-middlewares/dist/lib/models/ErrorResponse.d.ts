import type { StatusError } from './StatusError';
/**
 * an error containing a message to display in response and a status code
 * @example
 * ```json
 * {"error": "Internal Server Error"}
 * ```
 */
export declare class ErrorResponse extends Error implements StatusError {
    error: string;
    status: number;
    details?: string | Record<string, unknown> | undefined;
    constructor(error: string, status: number, details?: string | Record<string, unknown> | undefined);
}
