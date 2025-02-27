import { CreateIngredientDTO, IngredientDto } from "../dto/ingredient";
import { IngredientModel } from "../../db/models/IngredientModel";

export const toIngredient = (ingredient: IngredientModel): IngredientDto => {
  return {
    id: ingredient.id,
    name: ingredient.name,
    slug: ingredient.slug,
    description: ingredient.description,
    foodGroup: ingredient.foodGroup,
    createdAt: ingredient.createdAt,
    updatedAt: ingredient.updatedAt,
    deletedAt: ingredient.deletedAt,
    image: ingredient.image,
  };
};

export const toIngredientInput = (
  ingredient: CreateIngredientDTO
): IngredientModel => {
  return {
    name: ingredient.name,
    slug: ingredient.slug,
    description: ingredient.description,
    foodGroup: ingredient.foodGroup,
  };
};
