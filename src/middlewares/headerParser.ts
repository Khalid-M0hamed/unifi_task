import { Response, Request, NextFunction } from "express";

import { HttpException } from "../helpers/exption";
import { env } from "process";
import { exceptionMap } from "../typings/enums/httpExceptions";

/**
 * A middleware to parse  request  header
 * Finds the username that made the request
 * checks if the player is confirmed and not deleted
 */
export default async function headerParser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
   
   
  } catch (err) {
    return next(err);
  }

  next();
}