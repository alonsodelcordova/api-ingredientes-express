import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    try {
        //const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        //req.user = decoded; // Asignar el usuario decodificado al request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};