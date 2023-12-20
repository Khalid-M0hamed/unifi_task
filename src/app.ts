import express from "express";
import * as bodyParser from "body-parser";
import {userRouteFactory ,registerDependancies } from "./modules/user/userModuleFactory";

import cors from "cors";
import errorMiddleware from "./middlewares/exptionHandler";
import * as dotenv from "dotenv";
import { AuthPayload } from "./typings/interfaces/auth.interface";
import { Pagination } from "./typings/interfaces/pagination";
import { Database } from "./database/mongoose";
dotenv.config();

declare module 'express' {
  interface Request {
    user?: AuthPayload;
    lang?: string;
    file?: any;
    pagination?: Pagination;
  }
}
// const https = require("https");
// const key = fs.readFileSync(__dirname + "/ssl/server.key");
// const cert = fs.readFileSync(__dirname + "/ssl/server.crt");
//registerDependancies();

class Server {
  public app: express.Application;
  constructor() {
    this.app = express();

    this.config();
  }
  private config() {

    this.app.set("port", process.env.PORT || 8000);
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: false })); //get info from xxx-form-urlencoded
    this.app.use(bodyParser.json()); // get information from json
    this.connectDatabse();
    this.registerRoutes();
    this.app.use(errorMiddleware);
  }

  private registerRoutes() {
    this.app.use("/users", userRouteFactory());
  }

  private connectDatabse() {
    Database.Instance.connect();
  }
  public start(): void {
    // const httpsServer = https.createServer({ key: key, cert: cert }, this.app);
    // httpsServer.listen(this.app.get("port"), () => {
    //   console.log("app working at port " + this.app.get("port"));
    // });
    this.app.listen(this.app.get("port"), () => {
      console.log("app working at port " + this.app.get("port"));
    });
  }
}

// launch ======================================================================

const server = new Server();
server.start();