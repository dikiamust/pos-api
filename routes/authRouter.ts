import {Router} from "express";
import authController from "../controllers/authController";

class authRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.login();
    this.forgetPassword();
    this.changePassword();
  }

  public login(): void {
    this.router.post("/users", authController.login);
  }

  public forgetPassword(): void {
    this.router.post("/forgetPassword", authController.forgetPassword);
  }

  public changePassword(): void {
    this.router.put("/password/:userId/reset", authController.resetPassword);
  }
}

export default new authRouter().router;
