import {Router} from "express";
import ownerController from "../controllers/ownerController";

class ownerRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.addEmployee();
  }

  public addEmployee(): void {
    this.router.post("/employees", ownerController.addEmployee);
  }
}

export default new ownerRouter().router;
