"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supplier = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const supplierSchema = new mongoose_1.default.Schema({
    supplierName: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    contact: { type: String, required: true, unique: true },
    companyName: { type: String, required: true },
}, { timestamps: true });
const Supplier = mongoose_1.default.model("Supplier", supplierSchema);
exports.Supplier = Supplier;
