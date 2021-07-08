"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = require("../models/UserModel");
class authJwt {
    static async authentication(req, res, next) {
        try {
            const access_token = await req.headers.access_token;
            if (!access_token) {
                throw { name: "UNAUTHENTICATED" };
            }
            const key = process.env.SECRETKEY;
            jsonwebtoken_1.default.verify(access_token, key, (err, decoded) => {
                if (err) {
                    res
                        .status(401)
                        .json({ message: "Invalid access_token", success: false, data: err });
                }
                req.userID = decoded.id;
                req.userRole = decoded.role;
                next();
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async ownerAuthorization(req, res, next) {
        const ownerID = req.params.ownerId;
        const ownerId = req.userID;
        const role = req.userRole;
        const searchOwner = await UserModel_1.User.findById(ownerId);
        try {
            if (role !== "owner") {
                throw { name: "UNAUTHORIZED" };
            }
            if (searchOwner.id.toString() !== ownerID) {
                throw { name: "UNAUTHORIZED" };
            }
            else {
                next();
            }
        }
        catch (err) {
            next(err);
        }
    }
    static async inventoryAuthorization(req, res, next) {
        const inventoryID = req.params.inventoryId;
        const inventoryId = req.userID;
        const role = req.userRole;
        const searchInventory = await UserModel_1.User.findById(inventoryId);
        try {
            if (searchInventory.id.toString() !== inventoryID) {
                throw { name: "UNAUTHORIZED" };
            }
            if (role === "owner" || role === "inventory") {
                next();
            }
            else {
                throw { name: "UNAUTHORIZED" };
            }
        }
        catch (err) {
            next(err);
        }
    }
}
exports.default = authJwt;
