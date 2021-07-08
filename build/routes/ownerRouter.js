"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ownerController_1 = __importDefault(require("../controllers/ownerController"));
const authJwt_1 = __importDefault(require("../middlewares/authJwt"));
class ownerRouter {
    constructor() {
        this.router = express_1.Router();
        this.addEmployee();
    }
    addEmployee() {
        this.router.post("/employees/:ownerId", authJwt_1.default.ownerAuthorization, ownerController_1.default.addEmployee);
    }
}
exports.default = new ownerRouter().router;
