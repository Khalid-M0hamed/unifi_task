"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionMap = void 0;
exports.exceptionMap = {
    serverError: {
        message: "some thing went wrong ",
        customCode: "F500",
        status: 500,
    },
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
//# sourceMappingURL=httpExceptions.js.map