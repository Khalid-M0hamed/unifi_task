export enum DEFULAT_VARIABLES {
    password = "123456789",
    jwtExpireIn = "60min",
    jwtRefreshExpireIn = "30day",
  }
  export enum TOKEN_TYPES {
    verificationToken = 1,
    refreshToken = 2,
    forgetPasswordToken = 3,
  }
  
  export enum ROLE_ENUM {
    admin = 1,
    user = 2,
  }