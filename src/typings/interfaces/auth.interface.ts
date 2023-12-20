import { ROLE_ENUM } from "../enums/defualts.enum";

export interface AuthPayload {
    id: string;
    type: ROLE_ENUM;
  }