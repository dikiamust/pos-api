import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {User} from "../models/UserModel";

class authJwt {
  static async authentication(req: Request, res: Response, next: NextFunction) {
    try {
      const access_token: any = await req.headers.access_token;
      if (!access_token) {
        throw {name: "UNAUTHENTICATED"};
      }
      const key: string = process.env.SECRETKEY as string;
      jwt.verify(access_token, key, (err: any, decoded: any) => {
        if (err) {
          res
            .status(401)
            .json({message: "Invalid access_token", success: false, data: err});
        }
        (<any>req).userID = decoded.id;
        (<any>req).userRole = decoded.role;
        next();
      });
    } catch (err) {
      next(err);
    }
  }

  static async ownerAuthorization(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const ownerID = req.params.ownerId;
    const ownerId: string = (<any>req).userID;
    const role: string = (<any>req).userRole;
    const searchOwner: any = await User.findById(ownerId);

    try {
      if (role !== "owner") {
        throw {name: "UNAUTHORIZED"};
      }
      if (searchOwner.id.toString() !== ownerID) {
        throw {name: "UNAUTHORIZED"};
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
  }

  static async inventoryAuthorization(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const inventoryID = req.params.inventoryId;
    const inventoryId: string = (<any>req).userID;
    const role: string = (<any>req).userRole;
    const searchInventory: any = await User.findById(inventoryId);

    try {
      if (searchInventory.id.toString() !== inventoryID) {
        throw {name: "UNAUTHORIZED"};
      }
      if (role === "owner" || role === "inventory") {
        next();
      } else {
        throw {name: "UNAUTHORIZED"};
      }
    } catch (err) {
      next(err);
    }
  }
}

export default authJwt;
