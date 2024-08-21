import * as express from "express";
import * as jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import BusinessError from "./errors/BusinessError";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<User> {
  if (securityName === "jwt") {
    const token =
      request.body.token ||
      request.query.token ||
      request.headers["x-access-token"];

    console.log("token", token);

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new BusinessError("No token provided", { status: 401 }));
      }
      jwt.verify(token, "[secret]", function (err: any, decoded: any) {
        if (err) {
          reject(new BusinessError("Invalid token", { status: 401 }));
        } else {
          resolve(decoded);
        }
      });

      reject(new BusinessError("No token provided", { status: 401 }));
    });
  }

  return Promise.reject(
    new BusinessError("No token provided", { status: 401 })
  );
}
