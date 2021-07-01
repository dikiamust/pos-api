import {ErrorRequestHandler, Request, Response, NextFunction} from "express";

export default function errorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let code;
  let name = err.name;
  let message;

  switch (name) {
    case "REQUIRED":
      code = 401;
      message = "all fields must be filled";
      break;

    case "DUPLICATE_EMAIL":
      code = 409;
      message = "email already exist!";
      break;

    case "FAILED_REGISTER":
      code = 401;
      message = "failed to register!";
      break;

    default:
      code = 500;
      message = " internal server error!";
  }

  res.status(code).json({success: false, message});
}
