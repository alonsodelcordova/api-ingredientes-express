export interface CreateIngredientDTO {
  name: string;
  slug: string;
  description?: string;
  foodGroup?: string;
}

export interface UpdateIngredientDTO {
  name?: string;
  description?: string;
  foodGroup?: string;
}

export interface FilterIngredientsDTO {}

export interface IngredientDto {
  id?: number;
  name: string;
  slug: string;
  description?: string;
  foodGroup?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
