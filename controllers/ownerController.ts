import {Request, Response, NextFunction} from "express";
import {User} from "../models/UserModel";
import bcrypt from "bcrypt";

class ownerController {
  static async addEmployee(req: Request, res: Response, next: NextFunction) {
    const selectRole = req.body.role;
    try {
      if (!req.body.email) {
        throw {name: "REQUIRED"};
      }

      const emailExist: any = await User.findOne({email: req.body.email});
      if (emailExist) {
        throw {name: "DUPLICATE_EMAIL"};
      }

      if (
        selectRole === "inventory" ||
        selectRole === "cashier" ||
        selectRole === "finance"
      ) {
        const addEmployee: any = await User.create({
          username: req.body.username,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
          role: selectRole,
        });
        res.status(201).json({
          success: true,
          message: "Employee was added successfully!",
          data: addEmployee,
        });
      } else {
        throw {name: "FAILED_REGISTER"};
      }
    } catch (err) {
      next(err);
    }
  }
}

export default ownerController;
