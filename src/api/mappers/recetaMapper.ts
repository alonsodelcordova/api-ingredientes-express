import { RecetaModel } from "../../db/models/recetaModel"
import { RecetaDto, RegistrarRecetaDto } from "../dto/recetasDto"
import { toIngredient } from "./ingredient_mapper"



export const toRecetaInput = (payload: RegistrarRecetaDto): RecetaModel => {
    return {
        name: payload.name,
        slug: payload.slug,
        description: payload.description,
        preparation: payload.preparation,
        ingredientes: payload.ingredientes.map( (ing) => ({
            ingredientId: ing.ingredientId,
            quantity: ing.quantity,
            unit: ing.unit,
            measure: ing.measure
        }))
    }
}

export const toReceta = (receta: RecetaModel): RecetaDto => {
    return {
        id: receta.id,
        name: receta.name,
        slug: receta.slug,
        description: receta.description,
        preparation: receta.preparation,
        state: receta.state,
        createdAt: receta.createdAt,
        updatedAt: receta.updatedAt,
        imagen: receta.image,
        ingredientes : receta?.ingredientes?.map( (ing) => ({
            id: ing.id,
            recetaId: ing.recetaId,
            ingredientId: ing.ingredientId,
            quantity: ing.quantity,
            measure: ing.measure,
            unit: ing.unit,
            createdAt: ing.createdAt,
            updatedAt: ing.updatedAt,
            ingredient:  toIngredient(ing.ingredient) 
        }))
    }

}