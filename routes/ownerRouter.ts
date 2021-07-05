import {Router} from "express";
import ownerController from "../controllers/ownerController";
import authJwt from "../middlewares/authJwt";

class ownerRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.addEmployee();
  }

  public addEmployee(): void {
    this.router.post(
      "/employees/:ownerId",
      authJwt.ownerAuthorization,
      ownerController.addEmployee
    );
  }
}

export default new ownerRouter().router;
