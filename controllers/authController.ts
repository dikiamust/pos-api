import {Request, Response, NextFunction} from "express";
import {User} from "../models/UserModel";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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

  static async forgetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const reqEmail: any = await User.findOne({email: req.body.email});
      if (!reqEmail) {
        throw {name: "NULL_EMAIL"};
      }

      const key: string = process.env.SECRETKEY as string;
      const token = jwt.sign({id: reqEmail.id}, key, {expiresIn: "10m"});

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const templateEmail = {
        from: "'Owner Store8' <no-reply@gmail.com>",
        to: reqEmail.email,
        subject: ` Change Password Link `,
        html: `<p> To change your account's password, please click the link below </p><a href="${process.env.CLIENT_URL}password/${reqEmail.id}/reset?token=${token}" target="_blank">${process.env.CLIENT_URL}password/${reqEmail.id}/reset?token=${token}</a>`,
      };

      const sendMail = transporter.sendMail(
        templateEmail,
        (err: any, success: any) => {
          err ? console.log(err) : console.log("success " + success);
        }
      );

      res.status(200).json({
        message: "link sent successfully, please check your email!",
        data: reqEmail,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const reqNewPass = req.body.password;
      const token = req.query.token;
      const reqId = req.params.userId;

      if (!reqNewPass) {
        throw {name: "NULL_PASS"};
      }
      if (!reqId) {
        throw {name: "NULL_ID"};
      }
      if (!token) {
        throw {name: "NULL_TOKEN"};
      }
      const key: string = process.env.SECRETKEY as string;
      const decoded = jwt.verify(token as string, key) as {
        id: string;
      };
      if (reqId === decoded.id) {
        const newPass = await User.findByIdAndUpdate(
          reqId,
          {password: bcrypt.hashSync(reqNewPass, 8)},
          {new: true}
        );

        res.status(200).json({
          success: true,
          message: "Password has been successfully reset!",
          data: newPass,
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

export default authController;
