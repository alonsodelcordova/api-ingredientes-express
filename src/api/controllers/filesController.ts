import { NextFunction, Request } from "express";
import { updateImageIngredient } from "../../services/ingredientService";
import { eliminarImagenHelper } from "../../helpers/fileHelpers";
import { updateImageUsuario } from "../../services/usuariosService";

export const updateImagenController = async (
  req: Request,
  res: any,
  next: NextFunction
) => {

  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No se ha subido ninguna imagen." });
    }

    let filePath = req.file.path;
    filePath = filePath.replace(/\\/g, "/");
    const {model,id} = req.body;
    if (!model || !id) {
        eliminarImagenHelper(filePath);
        return res.status(400).json({ message: "Modelo o id no proporcionado." });
    }

    if (model == 'ingredient') {
        await updateImageIngredient(id, filePath);
    }
    else if (model == 'user'){
        await updateImageUsuario(id, filePath);
    }    
    else{
        eliminarImagenHelper(filePath);
        return res.status(400).json({ message: "Modelo no válido." });
    }





    return res
      .status(200)
      .json({ message: "Imagen subida con éxito.", filePath });
  } catch (error) {
    next(error);
  }
};
