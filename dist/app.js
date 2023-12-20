"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const userModuleFactory_1 = require("./modules/user/userModuleFactory");
const cors_1 = __importDefault(require("cors"));
const exptionHandler_1 = __importDefault(require("./middlewares/exptionHandler"));
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = require("./database/mongoose");
dotenv.config();
// const https = require("https");
// const key = fs.readFileSync(__dirname + "/ssl/server.key");
// const cert = fs.readFileSync(__dirname + "/ssl/server.crt");
//registerDependancies();
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
    }
    config() {
        this.app.set("port", process.env.PORT || 8000);
        this.app.use((0, cors_1.default)());
        this.app.use(bodyParser.urlencoded({ extended: false })); //get info from xxx-form-urlencoded
        this.app.use(bodyParser.json()); // get information from json
        this.connectDatabse();
        this.registerRoutes();
        this.app.use(exptionHandler_1.default);
    }
    registerRoutes() {
        this.app.use("/users", (0, userModuleFactory_1.userRouteFactory)());
    }
    connectDatabse() {
        mongoose_1.Database.Instance.connect();
    }
    start() {
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
//# sourceMappingURL=app.js.map