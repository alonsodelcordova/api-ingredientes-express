import * as ingredientRepository from "../db/repository/ingredient_repository";
import { IngredientModel } from "../db/models/IngredientModel";
import * as mapper from "../api/mappers/ingredient_mapper";
import {
  CreateIngredientDTO,
  IngredientDto,
  UpdateIngredientDTO,
} from "../api/dto/ingredient";


//----------------------------------------------------------------
// REGISTRAR INGREDIENTE
//----------------------------------------------------------------
export const create = async (
  payload: CreateIngredientDTO
): Promise<IngredientDto> => {

  const ingredientExists = await ingredientRepository.getBySlug(payload.slug);
  if (ingredientExists) {
    throw new Error("Ingrediente ya existe con ese slug");
  }


  const ingredientModel: IngredientModel = mapper.toIngredientInput(payload);
  const ingredient = await ingredientRepository.create(ingredientModel);
  return mapper.toIngredient(ingredient);
};


//----------------------------------------------------------------
// ACTUALIZAR INGREDIENTE
//----------------------------------------------------------------
export const update = async (
  id: number,
  payload: UpdateIngredientDTO
): Promise<IngredientDto> => {
  const ingredient = await ingredientRepository.getById(id);
  if (!ingredient) {
    throw new Error("Ingredient not found");
  }
  ingredient.name = payload.name;
  ingredient.description = payload.description;
  ingredient.foodGroup = payload.foodGroup;

  const result = await ingredientRepository.update(id, ingredient);
  if (!result) {
    throw new Error("Ingredient not updated");
  }
  return mapper.toIngredient(ingredient);
};


//----------------------------------------------------------------
// OBTENER INGREDIENTE POR ID
//----------------------------------------------------------------
export const getById = async (id: number): Promise<IngredientDto> => {
  const result = await ingredientRepository.getById(id);
  if (!result) {
    throw new Error("Ingredient not found");
  }
  return mapper.toIngredient(result);
};


//----------------------------------------------------------------
// ELIMINAR INGREDIENTE POR ID
//----------------------------------------------------------------
export const deleteById = async (id: number): Promise<boolean> => {
  const ingredient = await ingredientRepository.getById(id);
  if (!ingredient) {
    throw new Error("Ingredient not found");
  }
  return await ingredientRepository.deleteById(id);
};


//----------------------------------------------------------------
// OBTENER TODOS LOS INGREDIENTES
//----------------------------------------------------------------
export const getAllIngredientes = async (): Promise<IngredientDto[]> => {
  const data = await ingredientRepository.getAll();
  return data.map(mapper.toIngredient);
};
