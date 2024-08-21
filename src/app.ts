import { RegisterRoutes } from "../build/routes";
import cors from "cors";
import express, { json, urlencoded } from "express";
import { ErrorHandler } from "./middlewares/ErrorHandler";

export const app = express();

app.use(
  urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(json());

RegisterRoutes(app);

app.use(ErrorHandler);
