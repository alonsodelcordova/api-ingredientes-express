import { Router } from 'express'
import * as ingredientController from '../controllers/ingredient_controller'
import { authMiddleware } from '../middlewares/authMiddleware';

const ingredientsRouter = Router()
ingredientsRouter.use(authMiddleware)

// REGISTRAR INGREDIENTE
ingredientsRouter.post('/', ingredientController.createIngredientController);

// CONSULTAR INGREDIENTES
ingredientsRouter.get('/', ingredientController.consultarIngredientesController);

// CONSULTAR INGREDIENTE POR ID
ingredientsRouter.get('/:id', ingredientController.getIngredienteController);

// ACTUALIZAR INGREDIENTE
ingredientsRouter.put('/:id', ingredientController.actualizarIngredienteController);

// ELIMINAR INGREDIENTE
ingredientsRouter.delete('/:id', ingredientController.eliminarIngredienteController);

export default ingredientsRouter 