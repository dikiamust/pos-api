import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

class authJwt {
  static async authentication(req: Request, res: Response, next: NextFunction) {
    try {
      const access_token: any = await req.headers.access_token;
      if (!access_token) {
        throw {name: "NOT_AUTHENTICATED"};
      }
      const key: string = process.env.SECRETKEY as string;
      jwt.verify(access_token, key, (err: any, decoded: any) => {
        if (err) {
          res
            .status(401)
            .json({message: "Invalid access_token", success: false, data: err});
        }
        (<any>req).userID = decoded.id;
        next();
      });
    } catch (err) {
      next(err);
    }
  }
}

export default authJwt;
