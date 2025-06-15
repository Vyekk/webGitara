import { User } from './yourUserTypesFile';

declare global {
    namespace Express {
        interface Request {
            user?: {
                idUser: string;
            };
        }
    }
}
