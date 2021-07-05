import {Request, Response, NextFunction} from "express";
import {User} from "../models/UserModel";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

class authController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const reqEmail: any = await User.findOne({email: req.body.email});
      if (!reqEmail) {
        throw {name: "FALSE_LOGIN"};
      }

      const reqPassword: any = bcrypt.compareSync(
        req.body.password,
        reqEmail.password
      );
      if (!reqPassword) {
        throw {name: "FALSE_LOGIN"};
      }

      const key: string = process.env.SECRETKEY as string;
      let token = jwt.sign({id: reqEmail.id, role: reqEmail.role}, key, {
        expiresIn: "1h",
      });
      res.status(200).json({
        message: "login successful!",
        data: reqEmail,
        access_token: token,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default authController;
