import { Router } from "express";
import ingredientsRouter from "./ingredientsRoutes";
import userRouter from "./usuariosRoutes";
import  recetasRouter from "./recetasRoutes";

const apiRouter = Router();

apiRouter.use("/ingredients", ingredientsRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/recetas", recetasRouter);

export default apiRouter;
