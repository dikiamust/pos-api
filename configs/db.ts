import mongoose from "mongoose";

class mongoDB {
  constructor() {}

  public connect(): void {
    mongoose.connect(
      "mongodb://localhost/pos-api",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log("connected to database");
      }
    );
  }
}

export default new mongoDB().connect;
