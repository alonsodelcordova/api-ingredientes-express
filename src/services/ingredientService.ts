import * as ingredientRepository from "../db/repository/ingredient_repository";
import { IngredientModel } from "../db/models/IngredientModel";
import * as mapper from "../api/mappers/ingredient_mapper";
import {
  CreateIngredientDTO,
  IngredientDto,
  UpdateIngredientDTO,
} from "../api/dto/ingredient";

export const create = async (
  payload: CreateIngredientDTO
): Promise<IngredientDto> => {
  const ingredientModel: IngredientModel = mapper.toIngredientInput(payload);
  const ingredient = await ingredientRepository.create(ingredientModel);
  return mapper.toIngredient(ingredient);
};
export const update = async (
  id: number,
  payload: Partial<UpdateIngredientDTO>
): Promise<IngredientDto> => {
  const result: IngredientModel = await ingredientRepository.update(
    id,
    payload
  );
  return mapper.toIngredient(result);
};
export const getById = async (id: number): Promise<IngredientDto> => {
  const result: IngredientModel = await ingredientRepository.getById(id);
  return mapper.toIngredient(result);
};
export const deleteById = async (id: number): Promise<boolean> => {
  return await ingredientRepository.deleteById(id);
};
export const getAllIngredientes = async (): Promise<IngredientDto[]> => {
  const data = await ingredientRepository.getAll();
  return data.map(mapper.toIngredient);
};
