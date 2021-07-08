import {Application} from "express";
import express from "express";
import Routes from "./routes/indexRouter";
import mongoDB from "./configs/db";
import dotenv from "dotenv";
import cors from "cors";

class App {
  public app: Application;
  constructor() {
    dotenv.config();
    this.app = express();
    this.plugin();
    this.cors();
    this.route();
  }

  protected plugin(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    mongoDB();
  }

  protected cors(): void {
    this.app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
      );
      next();
    });
    this.app.use(cors());
  }

  protected route(): void {
    this.app.use(Routes);
  }
}

export default new App().app;
