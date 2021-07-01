import {Router, Request, Response} from "express";
import ownerRouter from "./ownerRouter";
import userRouter from "./userRouter";
import errorHandler from "../middlewares/errorHandler";
import authJwt from "../middlewares/authJwt";

class Routes {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
    this.userRouter();
    this.authJwt();
    this.ownerRouter();
    this.errorHandler();
  }

  public routes(): void {
    this.router.get("/", (req: Request, res: Response) => {
      res.send("success routes!");
    });
  }

  public userRouter(): void {
    this.router.use(userRouter);
  }

  public authJwt(): void {
    this.router.use(authJwt.authentication);
  }

  public ownerRouter(): void {
    this.router.use(ownerRouter);
  }

  public errorHandler(): void {
    this.router.use(errorHandler);
  }
}

export default new Routes().router;
