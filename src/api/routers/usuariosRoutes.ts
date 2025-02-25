import { Router } from "express";
import * as userController from "../controllers/usersController";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.get('/', authMiddleware, userController.consultarUsuariosController)

userRouter.post('/register', userController.registrarUsuarioController)
userRouter.post('/login', userController.iniciarSesion)


export default userRouter;
