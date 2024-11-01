import {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import { ValidateError } from "tsoa";
import BusinessError from "../errors/BusinessError";
import { error } from "console";

const ErrorHandler = (
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void => {
  if (err instanceof BusinessError) {
    return res.status(err.info.status).json({
      message: err.message,
    });
  }

  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
};

export { ErrorHandler };
