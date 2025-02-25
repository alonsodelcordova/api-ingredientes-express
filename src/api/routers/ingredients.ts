import { Router } from 'express'
import * as ingredientController from '../controllers/ingredient_controller'

const ingredientsRouter = Router()


ingredientsRouter.post('/', ingredientController.createIngredientController);
ingredientsRouter.get('/', ingredientController.consultarIngredientesController);
ingredientsRouter.get('/:id', ingredientController.getIngredienteController);
ingredientsRouter.put('/:id', ingredientController.actualizarIngredienteController);
ingredientsRouter.delete('/:id', ingredientController.eliminarIngredienteController);

export default ingredientsRouter 