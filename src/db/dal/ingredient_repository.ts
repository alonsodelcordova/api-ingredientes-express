
import {Ingredient} from '../models/Ingredient'
import {IngredientInput, IngredientOuput} from '../models/Ingredient'

export const create = async (payload: IngredientInput): Promise<IngredientOuput> => {
    const ingredient = await Ingredient.create(payload)
    return ingredient
}

export const update = async (id: number, payload: Partial<IngredientInput>): Promise<IngredientOuput> => {
    const ingredient = await Ingredient.findByPk(id)
    if (!ingredient) {
        // @todo throw custom error
        throw new Error('No se encontró el ingrediente')
    }
    const updatedIngredient = await (ingredient as Ingredient).update(payload)
    return updatedIngredient
}

export const getById = async (id: number): Promise<IngredientOuput> => {
    const ingredient = await Ingredient.findByPk(id)
    if (!ingredient) {
        // @todo throw custom error
        throw new Error('No se encontró el ingrediente')
    }
    return ingredient
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedIngredientCount = await Ingredient.destroy({
        where: {id}
    })
    return !!deletedIngredientCount
}

export const getAll = async (): Promise<IngredientOuput[]> => {
    return Ingredient.findAll()
}