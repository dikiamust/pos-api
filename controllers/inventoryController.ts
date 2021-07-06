import {Request, Response, NextFunction} from "express";
import {Supplier} from "../models/SupplierModel";
import {Product} from "../models/ProductModel";

class inventoryController {
  static async addSupplier(req: Request, res: Response, next: NextFunction) {
    try {
      const supplierNameExist: any = await Supplier.findOne({
        supplierName: req.body.supplierName,
      });
      const supplierContactExist: any = await Supplier.findOne({
        contact: req.body.contact,
      });

      if (supplierNameExist || supplierContactExist) {
        throw {name: "SUPPLIER_EXIST"};
      }
      const addSupplier: any = await Supplier.create({
        supplierName: req.body.supplierName,
        address: req.body.address,
        contact: req.body.contact,
        companyName: req.body.companyName,
      });

      if (!addSupplier) {
        throw {name: "FAILED_REGISTER"};
      } else {
        res.status(201).json({
          success: true,
          message: "Supplier was added succesfully!",
          data: addSupplier,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async addProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const supplier: any = await Supplier.findOne({
        supplierName: req.body.supplier,
      });
      if (!supplier) {
        throw {name: "NO_SUPPLIER"};
      }

      const addProduct: any = await Product.create({
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
        throw {name: "FAILED_REGISTER"};
      } else {
        res.status(201).json({
          success: true,
          message: "Product was added succesfully!",
          data: addProduct,
        });
      }
    } catch (err) {
      console.log("masuk error " + err);
      next(err);
    }
  }

  static async showAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const showAllProducts = await Product.find();
      if (showAllProducts.length < 0) {
        throw {name: "NO_PRODUCT"};
      } else {
        res.status(200).json({
          success: true,
          message: "All products displayed succesfully!",
          data: showAllProducts,
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

export default inventoryController;
