import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthUser } from '../types/types';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.token;

    if (!token) {
        res.status(401).json({ error: 'Token not provided' });
        return;
    }

    jwt.verify(
        token,
        process.env.JWT_SECRET!,
        (err: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => {
            if (err) {
                res.status(403).json({ error: 'Invalid token' });
                return;
            }

            req.user = decoded as AuthUser;

            next();
        },
    );
}
