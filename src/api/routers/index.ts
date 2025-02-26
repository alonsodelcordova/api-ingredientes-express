import { Router } from "express";
import ingredientsRouter from "./ingredientsRoutes";
import userRouter from "./usuariosRoutes";

const apiRouter = Router();

apiRouter.use("/ingredients", ingredientsRouter);
apiRouter.use("/user", userRouter);

export default apiRouter;
