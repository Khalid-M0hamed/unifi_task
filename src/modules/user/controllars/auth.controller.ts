
import { Router, Request, Response, NextFunction } from "express";

import { exceptionMap } from "../../../typings/enums/httpExceptions";
import { HttpException } from "../../../helpers/exption";
import jwt from "jsonwebtoken";
import * as validation from '../validation/auth.validation'
import { success } from "../../../helpers/response";
import {
  DEFULAT_VARIABLES,
  ROLE_ENUM,
  TOKEN_TYPES,
} from "../../../typings/enums/defualts.enum";

import { AuthPayload } from "../../../typings/interfaces/auth.interface";
import { hasRole } from "../../../middlewares/has_role";
import { getUserInfoQuery, getUserTokensQuery } from "../queries";
import { createUserTokenCommand, loginCommand } from "../commands";
import { getAccessToken } from "../../../services/jwt.service";
export class AuthController {
  private static _instance: AuthController;
  readonly path: string;
  public router: Router;
  //track next  guest user id  to save as guest user username
  static get Instance() {
    return this._instance ? this._instance : (this._instance = new this());
  }
  constructor() {
    this.path = "";
    this.router = Router();
    this.initRoutes();
  }
  private initRoutes() {
    

    this.router.post(
			this.path + "/auth/login",
			validation.login,
			this.login.bind(this)
		);

    this.router.post(
      this.path + "/auth/refresh-token",
      validation.refreshToken,
      this.refreshToken.bind(this)
    );

    this.router.get(
      this.path + "/auth/currentUser",
      [hasRole([ROLE_ENUM.user])],
      this.currentUser.bind(this)
    );
  }

  private async login(req: Request, res: Response, next: NextFunction) {
		try {
			const email = req.body.email
      const password = req.body.password
      const loginData =  await loginCommand.execute(email,password);
      return success(res, {
        loginData,
      });
		} catch (err) {
			return next(err);
		}
	}



  private async currentUser(req: Request, res: Response, next: NextFunction) {
    try {
      let user = await getUserInfoQuery.execute(req.user?.id ||'');
     
      if (!user) throw new HttpException(exceptionMap.forbiddenAccess);
      return success(res, {
        user,
      });
    } catch (err) {
      return next(err);
    }
  }
 
  private async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      let payload: AuthPayload = jwt.verify(
        req.body.refreshToken,
        process.env.REFRESH_JWT_SECRET as string
      ) as AuthPayload;

      let refreshToken = await getUserTokensQuery.execute(
         payload.id, req.body.refreshToken,
      );

      if (!refreshToken) throw new HttpException(exceptionMap.forbiddenAccess);

      let newRefreshToken = jwt.sign(
        { id: payload.id, type: payload.type } as AuthPayload,
        process.env.REFRESH_JWT_SECRET as string,
        {
          expiresIn: DEFULAT_VARIABLES.jwtRefreshExpireIn,
        }
      );
     
      await createUserTokenCommand.execute(payload.id,{ 
        token:newRefreshToken ,
        tokenType: TOKEN_TYPES.refreshToken
      })
     
      let accessToken = getAccessToken({ id: payload.id, type: payload.type });
      return success(res, {
        refreshToken: newRefreshToken,
        token: accessToken,
      });
    } catch (err:any) {
      if (!err?.customCode)
        return next(new HttpException(exceptionMap.forbiddenAccess));
      return next(err);
    }
  }
}