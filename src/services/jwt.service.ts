import { DEFULAT_VARIABLES } from "../typings/enums/defualts.enum";
import jwt from "jsonwebtoken";
import { AuthPayload } from "../typings/interfaces/auth.interface";


export  function getRefreshToken(payload: AuthPayload) {
  let refreshToken = jwt.sign(payload, process.env.REFRESH_JWT_SECRET as string, {
    expiresIn: DEFULAT_VARIABLES.jwtRefreshExpireIn,
  });
  return refreshToken;
}
export function getAccessToken(payload: AuthPayload) {
  return jwt.sign(payload, process.env.JWT_SECRET  as string, {
    expiresIn: DEFULAT_VARIABLES.jwtExpireIn,
  });
}