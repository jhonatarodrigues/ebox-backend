import { RegisterRoutes } from "../build/routes";
import cors from "cors";
import express, { json, urlencoded } from "express";
import { ErrorHandler } from "./middlewares/ErrorHandler";
import path from "path";

export const app = express();

app.use(
  urlencoded({
    extended: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(cors());
app.use(json());

RegisterRoutes(app);

app.use(ErrorHandler);
