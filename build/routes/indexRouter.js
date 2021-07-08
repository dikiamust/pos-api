"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ownerRouter_1 = __importDefault(require("./ownerRouter"));
const authRouter_1 = __importDefault(require("./authRouter"));
const inventoryRouter_1 = __importDefault(require("./inventoryRouter"));
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
const authJwt_1 = __importDefault(require("../middlewares/authJwt"));
class Routes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
        this.authRouter();
        this.authJwt();
        this.ownerRouter();
        this.inventoryRouter();
        this.errorHandler();
    }
    routes() {
        this.router.get("/", (req, res) => {
            res.status(200).json({ message: "Wellcome to My PoS Software API!" });
        });
    }
    authRouter() {
        this.router.use("/auth", authRouter_1.default);
    }
    authJwt() {
        this.router.use(authJwt_1.default.authentication);
    }
    ownerRouter() {
        this.router.use("/owner", ownerRouter_1.default);
    }
    inventoryRouter() {
        this.router.use("/inventory", inventoryRouter_1.default);
    }
    errorHandler() {
        this.router.use(errorHandler_1.default);
    }
}
exports.default = new Routes().router;
