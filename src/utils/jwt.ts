import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

const generateToken = (payload: User) => {
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    throw new Error("JWT_SECRET not provided");
  }

  const options = {
    expiresIn: "24h",
  };

  const token = jwt.sign(payload, secretKey, options);

  return token;
};

export { generateToken };
