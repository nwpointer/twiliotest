export interface StatusError extends Error {
    status: number;
    details?: string | Record<string, unknown>;
}
/**
 * StatusError guard type function
 */
export declare const isStatusError: (error: Error) => error is StatusError;
