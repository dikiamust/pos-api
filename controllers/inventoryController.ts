import {Request, Response, NextFunction} from "express";
import {Supplier} from "../models/SupplierModel";

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
}

export default inventoryController;
