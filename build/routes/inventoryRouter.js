"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventoryController_1 = __importDefault(require("../controllers/inventoryController"));
const authJwt_1 = __importDefault(require("../middlewares/authJwt"));
class inventoryRouter {
    constructor() {
        this.router = express_1.Router();
        this.addSupplier();
        this.addProduct();
        this.showAllProducts();
        this.editProduct();
    }
    addSupplier() {
        this.router.post("/suppliers/:inventoryId", authJwt_1.default.inventoryAuthorization, inventoryController_1.default.addSupplier);
    }
    addProduct() {
        this.router.post("/products/:inventoryId", authJwt_1.default.inventoryAuthorization, inventoryController_1.default.addProduct);
    }
    showAllProducts() {
        this.router.get("/products/:inventoryId", authJwt_1.default.inventoryAuthorization, inventoryController_1.default.showAllProducts);
    }
    editProduct() {
        this.router.put("/products/:productId/:inventoryId", inventoryController_1.default.editProduct, inventoryController_1.default.editProduct);
    }
}
exports.default = new inventoryRouter().router;
