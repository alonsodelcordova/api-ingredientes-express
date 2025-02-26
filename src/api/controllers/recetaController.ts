import { NextFunction, Request } from "express";
import * as recetasService from "../../services/recetasService";
import { RegistrarRecetaDto, RecetaDto } from "../dto/recetasDto";

export const registrarReceta = async (
    req: Request,
    res: any,
    next: NextFunction
) => {
    try {
        const recetaDto: RegistrarRecetaDto = req.body;
        const result: RecetaDto = await recetasService.registrarReceta(recetaDto);
        return res.status(201).json(result);
    } catch (error: any) {
        next({
            code: 400,
            message: error.message,
        });
    }
}



export const getReceta = async (req: Request, res: any) => {
    try{
        const id = parseInt(req.params.id);
        const result: RecetaDto = await recetasService.getReceta(id);
        return res.status(200).json(result);
    }catch(e:any){
        return res.status(404).json({
            message: e.message,
            success: false,
        });
    }
}