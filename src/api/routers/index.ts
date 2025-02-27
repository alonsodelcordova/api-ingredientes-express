import { Router } from "express";
import ingredientsRouter from "./ingredientsRoutes";
import userRouter from "./usuariosRoutes";
import  recetasRouter from "./recetasRoutes";
import { uploadMulter } from '../middlewares/uploadMiddleware';
import * as filesController from '../controllers/filesController';



const apiRouter = Router();

apiRouter.use("/ingredients", ingredientsRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/recetas", recetasRouter);



apiRouter.post(
    '/upload_imagen', 
    uploadMulter.single('image'), 
    filesController.updateImagenController
);


export default apiRouter;
