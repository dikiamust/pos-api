import {Router, Request, Response} from "express";

class Routes {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.get("/", (req: Request, res: Response) => {
      res.send("success routes!");
    });
  }
}

export default new Routes().router;
