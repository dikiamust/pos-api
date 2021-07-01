import {Router, Request, Response} from "express";
import ownerRouter from "./ownerRouter";
import errorHandler from "../middlewares/errorHandler";

class Routes {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
    this.ownerRouter();
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

  public errorHandler(): void {
    this.router.use(errorHandler);
  }
}

export default new Routes().router;
