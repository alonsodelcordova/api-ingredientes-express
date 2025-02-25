
import * as ingredientDal from '../db/dal/ingredient_repository'
import {IngredientInput, IngredientOuput} from '../db/models/Ingredient'
import * as mapper from '../api/mappers/ingredient_mapper'
import { CreateIngredientDTO, IngredientDto, UpdateIngredientDTO } from '../api/dto/ingredient'

export const create = async (payload: CreateIngredientDTO): Promise<IngredientDto> => {
    const ingredientModel: IngredientInput= mapper.toIngredientInput(payload)
    const ingredient = await ingredientDal.create(ingredientModel)
    return mapper.toIngredient(ingredient)
}
export const update = async (id: number, payload: Partial<UpdateIngredientDTO>): Promise<IngredientDto> => {
    const result: IngredientOuput = await ingredientDal.update(id, payload)
    return mapper.toIngredient(result)
}
export const getById = async (id: number): Promise<IngredientDto> => {
    const result: IngredientOuput = await ingredientDal.getById(id)
    return mapper.toIngredient(result)
}
export const deleteById = async (id: number): Promise<boolean> => {
    return await ingredientDal.deleteById(id)
}
export const getAllIngredientes = async (): Promise<IngredientDto[]> => {
    const data = await ingredientDal.getAll()
    return data.map(mapper.toIngredient)
}