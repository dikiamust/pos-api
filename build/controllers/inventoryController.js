"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SupplierModel_1 = require("../models/SupplierModel");
const ProductModel_1 = require("../models/ProductModel");
class inventoryController {
    static async addSupplier(req, res, next) {
        try {
            const supplierNameExist = await SupplierModel_1.Supplier.findOne({
                supplierName: req.body.supplierName,
            });
            const supplierContactExist = await SupplierModel_1.Supplier.findOne({
                contact: req.body.contact,
            });
            if (supplierNameExist || supplierContactExist) {
                throw { name: "SUPPLIER_EXIST" };
            }
            const addSupplier = await SupplierModel_1.Supplier.create({
                supplierName: req.body.supplierName,
                address: req.body.address,
                contact: req.body.contact,
                companyName: req.body.companyName,
            });
            if (!addSupplier) {
                throw { name: "FAILED_REGISTER" };
            }
            else {
                res.status(201).json({
                    success: true,
                    message: "Supplier was added succesfully!",
                    data: addSupplier,
                });
            }
        }
        catch (err) {
            next(err);
        }
    }
    static async addProduct(req, res, next) {
        try {
            const supplier = await SupplierModel_1.Supplier.findOne({
                supplierName: req.body.supplier,
            });
            if (!supplier) {
                throw { name: "NO_SUPPLIER" };
            }
            const addProduct = await ProductModel_1.Product.create({
                productName: req.body.productName,
                productBrand: req.body.productBrand,
                image: req.body.image,
                purchasePrice: req.body.purchasePrice,
                sellingPrice: req.body.sellingPrice,
                UOM: req.body.UOM,
                barcode: req.body.barcode,
                supplier: supplier,
            });
            if (!addProduct) {
                throw { name: "FAILED_REGISTER" };
            }
            else {
                res.status(201).json({
                    success: true,
                    message: "Product was added succesfully!",
                    data: addProduct,
                });
            }
        }
        catch (err) {
            console.log("masuk error " + err);
            next(err);
        }
    }
    static async showAllProducts(req, res, next) {
        try {
            const showAllProducts = await ProductModel_1.Product.find();
            if (showAllProducts.length < 0) {
                throw { name: "NO_PRODUCT" };
            }
            else {
                let totalProducts = showAllProducts.length;
                res.status(200).json({
                    success: true,
                    message: "All products displayed succesfully!",
                    data: showAllProducts,
                    totalProducts,
                });
            }
        }
        catch (err) {
            next(err);
        }
    }
    static async editProduct(req, res, next) {
        const { productName, image, status, barcode } = req.body;
        const updateData = { productName, image, status, barcode };
        for (const key in updateData) {
            if (!updateData[key]) {
                delete updateData[key];
            }
        }
        try {
            if (Object.keys(updateData).length === 0) {
                throw { name: "NOT_EDITED" };
            }
            else {
                const editProduct = await ProductModel_1.Product.findByIdAndUpdate(req.params.productId, updateData, { new: true });
                res.status(200).json({
                    success: true,
                    message: "Product was updated successfully!",
                    data: editProduct,
                });
            }
        }
        catch (err) {
            next(err);
        }
    }
}
exports.default = inventoryController;
