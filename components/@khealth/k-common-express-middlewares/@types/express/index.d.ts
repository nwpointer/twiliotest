import type { JwtPayload } from 'jsonwebtoken'
declare global {
    namespace Express {
        interface UserContext extends JwtPayload {
            /**
             * authenticated user id
             */
            userId: string
            /**
             * user claims
             */
            userClaims: Record<string, string>
            /**
             * user access token
             */
            accessToken: string
            [key: string]: unknown
        }


        interface Request {
            user: UserContext
        }
    }
}
