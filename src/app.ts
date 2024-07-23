import { RegisterRoutes } from "../build/routes";
import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
  json,
  urlencoded,
} from "express";
import { ValidateError } from "tsoa";

export const app = express();

app.use(
  urlencoded({
    extended: true,
  })
);

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
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
});

app.use(json());

RegisterRoutes(app);
