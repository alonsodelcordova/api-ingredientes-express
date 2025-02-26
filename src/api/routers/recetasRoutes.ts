import { Router } from "express";
import * as recetaController from "../controllers/recetaController";
import { authMiddleware } from "../middlewares/authMiddleware";

const recetaRouter = Router();
recetaRouter.use(authMiddleware);

// REGISTRAR RECETA
recetaRouter.post("/", recetaController.registrarReceta);

// CONSULTAR RECETA
recetaRouter.get("/:id", recetaController.getReceta);

//ELIMINAR RECETA
recetaRouter.delete("/:id", recetaController.deleteReceta);


export default recetaRouter;