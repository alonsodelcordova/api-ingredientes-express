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


export const deleteRecetaRepository = async (
  id: number
): Promise<boolean> => {
    const deletedRecetaCount = await Receta.destroy({
        where: { id },
    });
    return !!deletedRecetaCount;
}

export const existeRecetaRepository = async (
    id: number
): Promise<boolean> => {
    const receta = await Receta.findByPk(id);
    return receta !== null;
}


export const updateFotoRecetaRepository = async (
  id: number,
  image: string
): Promise<boolean> => {
  const recetaUpd = await Receta.update(
    { image: image },
    { where: { id } }
  );
  return recetaUpd[0] > 0;
}

export const getAllRecetasRepository = async (): Promise<RecetaModel[]> => {
  const recetas = await Receta.findAll({
    include: [
      {
        model: IngredientReceta,
        as: "ingredientes",
        include: ["ingredient"],
      },
    ],
  });
  return recetas.map((receta) => receta.toJSON() as RecetaModel);
}