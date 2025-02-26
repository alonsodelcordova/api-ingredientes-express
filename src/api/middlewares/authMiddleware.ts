import {  Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../../helpers/constants';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) : any => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: 'Acceso no autorizado' 
        });
    }

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        //req.user = decoded; // Asignar el usuario decodificado al request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};