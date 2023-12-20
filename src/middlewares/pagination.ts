import { Response, Request, NextFunction } from "express";
import { HttpException } from "../helpers/exption";
import { Pagination } from "../typings/interfaces/pagination";
import { exceptionMap } from "../typings/enums/httpExceptions";

/**
 * A middleware to parse  request  header
 * Finds the username that made the request
 * checks if the player is confirmed and not deleted
 */
export default async function PaginationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let pagination: Pagination = {};
    pagination.pagonationOptions = {};
    if (req.query?.limit && +req.query?.limit >= 0)
      pagination.pagonationOptions.limit = +req.query?.limit;
    if (req.query?.offset &&+req.query?.offset >= 0)
      pagination.pagonationOptions.offset = +req.query?.offset;
    pagination.filters = {};
    for (let key in req.query) {
      pagination.filters[key.toString()] = req.query[key];
    }
    req.pagination = pagination;
  } catch (err:any) {
    if (err.customCode) return next(err);

    return next(new HttpException(exceptionMap.serverError));
  }
  next();
}