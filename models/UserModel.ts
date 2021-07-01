import mongoose from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
  role: string;
}

interface UserDoc extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  role: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attr: IUser): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    username: {type: String},
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: (v: any) => {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
    },
    password: {type: String, default: "1234"},
    role: {type: String},
  },
  {timestamps: true}
);

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export {User};
