import mongoose from "mongoose";
import dotenv from "dotenv";

class mongoDB {
  constructor() {
    dotenv.config();
  }

  public connect(): void {
    const pathURI = process.env.DB_HOST as string;
    const connectOption = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };
    mongoose.connect(pathURI, connectOption, () => {
      console.log("connected to database");
    });
  }
}

export default new mongoDB().connect;
