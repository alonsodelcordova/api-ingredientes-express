import { Router } from 'express'
import * as ingredientController from '../controllers/ingredient_controller'
import { authMiddleware } from '../middlewares/authMiddleware';
import { uploadMulter } from '../middlewares/uploadMiddleware';

const multerIngredient = uploadMulter('./uploads/ingredients')


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


ingredientsRouter.put('/image/:id', multerIngredient.single('image'), 
ingredientController.updateImagenIngredienteController);


export default ingredientsRouter 