import {Router} from "express";
import inventoryController from "../controllers/inventoryController";
import authJwt from "../middlewares/authJwt";

class inventoryRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.addSupplier();
  }

  public addSupplier(): void {
    this.router.post(
      "/suppliers/:inventoryId",
      authJwt.inventoryAuthorization,
      inventoryController.addSupplier
    );
  }
}

export default new inventoryRouter().router;
