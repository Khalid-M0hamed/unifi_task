import { NextFunction, Request, Response } from "express";
import { HttpException } from "../helpers/exption";
function errorMiddleware(
  error: HttpException | { [key: string]: any; [key: number]: any },
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  const customCode = error.customCode || "500";
  return res.status(status).json({
    status,
    message,
    customCode,
  });
}

export default errorMiddleware;