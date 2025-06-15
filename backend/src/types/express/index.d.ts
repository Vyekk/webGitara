import { JwtPayload } from '../../middleware/authenticateToken';

declare module 'express-serve-static-core' {
    interface Request {
        user?: JwtPayload;
    }
}
