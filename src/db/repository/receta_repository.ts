import { sequelizeConn } from "../config/init";
import {
  IngredientReceta,
  IngredientRecetaModel,
  Receta,
  RecetaModel,
} from "../models/recetaModel";

export const registrarRecetaRepository = async (
  payload: RecetaModel
): Promise<RecetaModel> => {
  const recetaExist = await Receta.findOne({
    where: {
      slug: payload.slug,
    },
  });
  if (recetaExist) {
    throw new Error("Receta ya existe con ese slug");
  }

  try {
    // Guardar Receta cabecera
    const receta = await Receta.create(payload);
    const recetaModel = receta.toJSON() as RecetaModel;

    if (payload.ingredientes) {
        const listaIngredientes: IngredientRecetaModel[] = payload.ingredientes.map(
            (ingrediente) => ({
                ...ingrediente,
                recetaId: recetaModel.id
            })
        );
        const data = await IngredientReceta.bulkCreate(listaIngredientes);
        recetaModel.ingredientes = data.map((ingrediente) => ingrediente.toJSON()) as IngredientRecetaModel[];
    }
  
    return recetaModel;
  } catch (error: any) {
    console.error(error);
    throw new Error("Error al registrar la receta");
  }
};

export const getRecetaByIdRepository = async (
  id: number
): Promise<RecetaModel | undefined> => {
  const receta = await Receta.findByPk(id, {
    include: [
      {
        model: IngredientReceta,
        as: "ingredientes",
      },
    ],
  });
  if (receta) {
    return receta.toJSON() as RecetaModel;
  }
  return undefined;
};
