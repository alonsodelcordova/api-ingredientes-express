import { Ingredient, IngredientModel } from "../models/IngredientModel";

export const create = async (
  payload: IngredientModel
): Promise<IngredientModel> => {
  const ingredient = await Ingredient.create(payload);
  const response = ingredient.toJSON() as IngredientModel;
  return response;
};

export const update = async (
  id: number,
  ingredient: IngredientModel
): Promise<boolean> => {
  const insertInt = await Ingredient.update(ingredient, {
    where: { id }
  });
  return insertInt[0] > 0;
};

export const getById = async (id: number): Promise<IngredientModel|undefined> => {
  const ingredient = await Ingredient.findByPk(id);
  if (ingredient) {
    return ingredient.toJSON() as IngredientModel;
  }
  return undefined;
  
};

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedIngredientCount = await Ingredient.destroy({
    where: { id },
  });
  return !!deletedIngredientCount;
};

export const getAll = async (): Promise<IngredientModel[]> => {
  const data = await Ingredient.findAll();
  return data.map((ingredient) => ingredient.toJSON() as IngredientModel);
};


export const getBySlug = async (slug: string): Promise<IngredientModel|undefined> => {
  const ingredient = await Ingredient.findOne({
    where: { slug },
  });
  if (ingredient) {
    return ingredient.toJSON() as IngredientModel;
  }
  return undefined;
}