import {Router, Request, Response} from "express";
import ownerRouter from "./ownerRouter";
import authRouter from "./authRouter";
import inventoryRouter from "./inventoryRouter";
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
    this.inventoryRouter();
    this.errorHandler();
  }

  public routes(): void {
    this.router.get("/", (req: Request, res: Response) => {
      res.status(200).json({message: "Wellcome to My PoS Software API!"});
    });
  }

  public authRouter(): void {
    this.router.use("/auth", authRouter);
  }

  public authJwt(): void {
    this.router.use(authJwt.authentication);
  }

  public ownerRouter(): void {
    this.router.use("/owner", ownerRouter);
  }

  public inventoryRouter(): void {
    this.router.use("/inventory", inventoryRouter);
  }

  public errorHandler(): void {
    this.router.use(errorHandler);
  }
}

export default new Routes().router;
