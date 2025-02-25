import { CreateIngredientDTO, IngredientDto } from "../dto/ingredient"
import { IngredientInput, IngredientOuput } from "../../db/models/Ingredient"


export const toIngredient = (ingredient: IngredientOuput):IngredientDto => {
    return {
        id: ingredient.id,
        name: ingredient.name,
        slug: ingredient.slug,
        description: ingredient.description,
        foodGroup: ingredient.foodGroup,
        createdAt: ingredient.createdAt,
        updatedAt: ingredient.updatedAt,
        deletedAt: ingredient.deletedAt
    }
}

export const toIngredientInput = (ingredient: CreateIngredientDTO): IngredientInput => {
    return {
        name: ingredient.name,
        slug: ingredient.slug,
        description: ingredient.description,
        foodGroup: ingredient.foodGroup
    }
}