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
  payload: Partial<IngredientModel>
): Promise<IngredientModel> => {
  const ingredient = await Ingredient.findByPk(id);
  if (!ingredient) {
    // @todo throw custom error
    throw new Error("No se encontró el ingrediente");
  }
  const updatedIngredient = await (ingredient as Ingredient).update(payload);
  const response = updatedIngredient.toJSON() as IngredientModel;
  return response;
};

export const getById = async (id: number): Promise<IngredientModel> => {
  const ingredient = await Ingredient.findByPk(id);
  if (!ingredient) {
    // @todo throw cust
    throw new Error("No se encontró el ingrediente");
  }
  return ingredient.toJSON() as IngredientModel;
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
