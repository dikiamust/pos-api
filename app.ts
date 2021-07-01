import {Application} from "express";
import express from "express";
import Routes from "./routes/indexRouter";
import mongoDB from "./configs/db";

class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.plugin();
    this.route();
  }

  protected plugin(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    mongoDB();
  }

  protected route(): void {
    this.app.use(Routes);
  }
}

const port = 3010;
const app = new App().app;
app.listen(port, () => {
  console.log(`Server run on http://localhost:${port}`);
});
