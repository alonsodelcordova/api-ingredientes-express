
import { NextFunction, Request } from 'express'
import * as service from '../../services/ingredientService'
import {CreateIngredientDTO, UpdateIngredientDTO,IngredientDto} from '../dto/ingredient'


export const consultarIngredientesController = async (req: Request, res: any) => {
    const result = await service.getAllIngredientes()
    return res.status(200).json(result)
}

export const createIngredientController = async (req: Request, res: any, next:NextFunction) => {
    try{
        const payload: CreateIngredientDTO = req.body
        const result = await service.create(payload)
        return res.status(201).json(result)
    }catch(e:any){
        next({
            code: 400,
            message: e.message
        })
    }
}

export const getIngredienteController = async (req: Request, res: any, next: NextFunction) => {
    
    try{
        const id = Number(req.params.id)
        const result = await service.getById(id)
        return res.status(200).json(result)
    }catch(e: any){
        next({
            code: 404,
            message: e.message
        })
    }
   
}
export const actualizarIngredienteController = async (req: Request, res: any) => {
    const id = Number(req.params.id)
    const payload: UpdateIngredientDTO = req.body
    const result = await service.update(id, payload)
    return res.status(201).json(result)
}

export const eliminarIngredienteController = async (req: Request, res: any) => {
    const id = Number(req.params.id)
    const result = await service.deleteById(id)
    return res.status(204).json({
        success: result
    })
}
