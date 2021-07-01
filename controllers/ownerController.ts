import {Request, Response, NextFunction} from "express";
import {User} from "../models/UserModel";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

class ownerController {
  static async addEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.email) {
        throw {name: "REQUIRED"};
      }

      const emailExist: any = await User.findOne({email: req.body.email});
      if (emailExist) {
        throw {name: "DUPLICATE_EMAIL"};
      }

      const addEmployee: any = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: req.body.role,
      });
      if (
        addEmployee.role === "inventory" ||
        addEmployee.role === "finance" ||
        addEmployee.role === "cashier"
      ) {
        res.status(201).json({
          success: true,
          message: "Employee was added successfully!",
          data: addEmployee,
        });
      } else {
        console.log(addEmployee.role);
        throw {name: "FAILED_REGISTER"};
      }
    } catch (err) {
      next(err);
    }
  }
}

export default ownerController;
