import {Router} from "express";
import authController from "../controllers/authController";

class authRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.login();
  }

  public login(): void {
    this.router.post("/users", authController.login);
  }
}

export default new authRouter().router;
