"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    productName: { type: String, required: true },
    productBrand: { type: String, required: true },
    stock: { type: Number, default: 0 },
    image: { type: Buffer, required: true },
    purchasePrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    UOM: { type: String, required: true },
    barcode: { type: String, required: true, unique: true },
    supplier: { type: mongoose_1.default.Types.ObjectId, ref: "Supplier" },
    status: { type: String, default: "inactive" },
}, { timestamps: true });
const Product = mongoose_1.default.model("Product", productSchema);
exports.Product = Product;
