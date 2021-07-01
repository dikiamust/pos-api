import {Router} from "express";
import userController from "../controllers/userController";

class userRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.login();
  }

  public login(): void {
    this.router.post("/users", userController.login);
  }
}

export default new userRouter().router;
