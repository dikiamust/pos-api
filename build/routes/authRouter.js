"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
class authRouter {
    constructor() {
        this.router = express_1.Router();
        this.login();
        this.forgetPassword();
        this.changePassword();
    }
    login() {
        this.router.post("/login", authController_1.default.login);
    }
    forgetPassword() {
        this.router.post("/forgetPassword", authController_1.default.forgetPassword);
    }
    changePassword() {
        this.router.put("/password/:userId/reset", authController_1.default.resetPassword);
    }
}
exports.default = new authRouter().router;
