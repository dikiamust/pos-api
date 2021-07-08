"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = require("../models/UserModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
class ownerController {
    static async addEmployee(req, res, next) {
        const selectRole = req.body.role;
        try {
            if (!req.body.email) {
                throw { name: "REQUIRED" };
            }
            const emailExist = await UserModel_1.User.findOne({ email: req.body.email });
            if (emailExist) {
                throw { name: "DUPLICATE_EMAIL" };
            }
            if (selectRole === "inventory" ||
                selectRole === "cashier" ||
                selectRole === "finance") {
                const addEmployee = await UserModel_1.User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: bcrypt_1.default.hashSync(req.body.password, 8),
                    role: selectRole,
                });
                res.status(201).json({
                    success: true,
                    message: "Employee was added successfully!",
                    data: addEmployee,
                });
            }
            else {
                throw { name: "FAILED_REGISTER" };
            }
        }
        catch (err) {
            next(err);
        }
    }
}
exports.default = ownerController;
