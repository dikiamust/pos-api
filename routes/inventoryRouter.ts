import {Router} from "express";
import inventoryController from "../controllers/inventoryController";
import authJwt from "../middlewares/authJwt";

class inventoryRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.addSupplier();
    this.addProduct();
    this.showAllProducts();
  }

  public addSupplier(): void {
    this.router.post(
      "/suppliers/:inventoryId",
      authJwt.inventoryAuthorization,
      inventoryController.addSupplier
    );
  }

  public addProduct(): void {
    this.router.post(
      "/products/:inventoryId",
      authJwt.inventoryAuthorization,
      inventoryController.addProduct
    );
  }

  public showAllProducts(): void {
    this.router.get(
      "/products/:inventoryId",
      authJwt.inventoryAuthorization,
      inventoryController.showAllProducts
    );
  }
}

export default new inventoryRouter().router;
