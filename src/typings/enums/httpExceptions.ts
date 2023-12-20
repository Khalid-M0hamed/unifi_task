import { HttpException } from "../../helpers/exption";
export const exceptionMap = {
  serverError: {
    message: "some thing went wrong ",
    customCode: "F500",
    status: 500,
  } as HttpException,
  validationError: {
    message: "validation error",
    customCode: "VE400",
    status: 400,
  },
  userNotFound: {
    message: "user not found",
    customCode: "U400",
    status: 400,
  },

  todoNotFound: {
    message: "Todo not found",
    customCode: "TD400",
    status: 400,
  },

  userExisted: {
    message: "user already exist",
    customCode: "UE400",
    status: 400,
  },
  uniqueEmail: {
    message: "email Already exist",
    customCode: "UEA400",
    status: 400,
  },
  resourceExist: {
    message: "resource already exist",
    customCode: "RAE400",
    status: 400,
  },
  resourceNotFound: {
    message: "resource not exist",
    customCode: "RNE400",
    status: 400,
  },
 
  wrongPasswordOrUSerName: {
    message: "wrong username or password",
    customCode: "WUPU401",
    status: 401,
  },

  invalidAccessToken: {
    message: "invalid access token",
    customCode: "IVAT401",
    status: 401,
  },

  forbiddenAccess: {
    message: "forbidden access",
    customCode: "FBA403",
    status: 403,
  },
};