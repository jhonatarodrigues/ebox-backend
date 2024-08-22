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

  jwt.verify(token, secretKey as string, function (err: any, decoded: any) {
    console.log("err--- ", err);

    if (err) {
      throw new Error("Invalid token");
    } else {
      console.log("decoded", decoded);
    }
  });

  return token;
};

export { generateToken };
