import { Response, Request, NextFunction } from "express";
import { exceptionMap } from '../typings/enums/httpExceptions';
import { HttpException } from "../helpers/exption";
import { ROLE_ENUM } from "../typings/enums/defualts.enum";
import jwt from "jsonwebtoken";
import { AuthPayload } from "../typings/interfaces/auth.interface";

export function hasRole(roles: ROLE_ENUM[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization)
        throw new HttpException(exceptionMap.invalidAccessToken);
      let token = req.headers.authorization;
      token = token.toString();
      let payload: AuthPayload = jwt.verify(token, process.env.JWT_SECRET as string) as AuthPayload;
      if (!payload) throw new HttpException(exceptionMap.invalidAccessToken);
      req.user = payload;
      for (let role of roles) {
        if (payload.type == role) return next();
      }

      return next(new HttpException(exceptionMap.forbiddenAccess));
    } catch (err) {
      if ( err instanceof HttpException && err.customCode) return next(err);
      return next(new HttpException(exceptionMap.invalidAccessToken));
    }
  };
}