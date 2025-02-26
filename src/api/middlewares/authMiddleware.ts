import {  Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../../helpers/constants';
import * as userService from '../../services/usuariosService';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: 'Acceso no autorizado' 
        });
    }

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        const data =  await userService.consultarToken(token)
        if(!data){
            return res.status(401).json({ 
                success: false,
                message: 'Token inválido'
            });
        }
        next();
    } catch (error) {
        next({
            code: 401,
            message: 'Token inválido'
        })
    }
};