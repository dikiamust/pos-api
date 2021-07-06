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

    case "FALSE_LOGIN":
      code = 401;
      message = "email or password invalid!";
      break;

    case "UNAUTHENTICATED":
      code = 401;
      message = "Missing access_token";
      break;

    case "UNAUTHORIZED":
      code = 401;
      message = "Forbidden access";
      break;

    case "SUPPLIER_EXIST":
      code = 409;
      message = "Supplier or contact already exist!";
      break;

    case "NO_SUPPLIER":
      code = 204;
      message = "Supplier doesn't exist! ";
      break;

    case "NO_PODUCT":
      code = 204;
      message = "Product not found!";
      break;

    case "NOT_EDITED":
      code = 400;
      message = "Edit failed!";
      break;

    default:
      code = 500;
      message = "Internal server error!";
  }

  res.status(code).json({success: false, message});
}
