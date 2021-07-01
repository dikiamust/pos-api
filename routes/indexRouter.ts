import {Router, Request, Response} from "express";
import ownerRouter from "./ownerRouter";
import userRouter from "./userRouter";
import errorHandler from "../middlewares/errorHandler";

class Routes {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
    this.ownerRouter();
    this.userRouter();
    this.errorHandler();
  }

  public routes(): void {
    this.router.get("/", (req: Request, res: Response) => {
      res.send("success routes!");
    });
  }

  public ownerRouter(): void {
    this.router.use(ownerRouter);
  }

  public userRouter(): void {
    this.router.use(userRouter);
  }

  public errorHandler(): void {
    this.router.use(errorHandler);
  }
}

export default new Routes().router;
