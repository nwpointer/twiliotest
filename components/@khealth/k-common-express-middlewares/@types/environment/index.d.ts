declare global {
    namespace NodeJS {
        interface ProcessEnv {
            JWK_REQUEST_PER_MINUTE?: number;
            ASYMMETRIC_PUBLIC_KEY: string
            PING_ENVIRONMENT_ID: string
            PING_AUTH_URL: string
        }
    }
}
export {}