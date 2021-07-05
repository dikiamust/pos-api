import {Router, Request, Response} from "express";
import ownerRouter from "./ownerRouter";
import authRouter from "./authRouter";
import errorHandler from "../middlewares/errorHandler";
import authJwt from "../middlewares/authJwt";

class Routes {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
    this.authRouter();
    this.authJwt();
    this.ownerRouter();
    this.errorHandler();
  }

  public routes(): void {
    this.router.get("/", (req: Request, res: Response) => {
      res.send("success routes!");
    });
  }

  public authRouter(): void {
    this.router.use(authRouter);
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
