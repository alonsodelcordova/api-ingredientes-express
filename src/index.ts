import express from "express";
import { dbInit } from "./db/config/init";
import apiRouter from "./api/routers/index";
import { errorMiddleware } from "./api/middlewares/errorMiddleware";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbInit();

// main router
app.use("/api/v1", apiRouter);
app.use("/uploads", express.static("uploads"));

// error middleware
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
