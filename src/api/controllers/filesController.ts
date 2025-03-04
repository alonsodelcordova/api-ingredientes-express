import { NextFunction, Request } from "express";
import * as ingredientService from "../../services/ingredientService";
import * as fileHelpers from "../../helpers/fileHelpers";
import * as usuariosService from "../../services/usuariosService";
import * as recetasService from "../../services/recetasService";
import { generateReportUserPDF } from "./pdfs/reportUsers";

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
    const { model, id } = req.body;
    if (!model || !id) {
      fileHelpers.eliminarImagenHelper(filePath);
      return res.status(400).json({ message: "Modelo o id no proporcionado." });
    }

    if (model == "ingredient") {
      await ingredientService.updateImageIngredient(id, filePath);
    } else if (model == "user") {
      await usuariosService.updateImageUsuario(id, filePath);
    } else if (model == "receta") {
      await recetasService.updateFotoReceta(id, filePath);
    } else {
      fileHelpers.eliminarImagenHelper(filePath);
      return res.status(400).json({ message: "Modelo no válido." });
    }

    return res
      .status(200)
      .json({ message: "Imagen subida con éxito.", filePath });
  } catch (error) {
    next(error);
  }
};


export const generateUserPDF = async (req: Request, res: any) => {
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'inline; filename="reporte.pdf"');
  res.setHeader("Access-Control-Allow-Origin", "*");
 
  generateReportUserPDF(res);
};

