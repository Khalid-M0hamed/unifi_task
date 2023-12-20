import injectionService from "../../services/Injection.service";
import * as controllers from "./controllars";
import { Router } from "express";
import { UserRepository } from "./repositories";


export const registerDependancies = () => {
  injectionService.registerRepository('UserRepository',UserRepository)
};

export const userRouteFactory = () => {
  let router = Router();
  for (let property in controllers) {
    router.use((<any>controllers)[property].Instance.router);
  }
  return router;
};



