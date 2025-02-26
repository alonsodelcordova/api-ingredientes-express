import { Request, Response, NextFunction } from "express";
import { Error } from "../dto/helperDto";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  let code = err.code || 500;
  let message = err.message || "Internal Server Error";
  res.status(code).json({
    success: false,
    message: message,
  });
};
