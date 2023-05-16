import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Receiving Token
  const authToken = req.headers.authorization;

  // Check if Token exists
  if (!authToken) {
    return res.status(401).end();
  }

  // This ignores first value before empty space and assigns the second value to token.
  const [, token] = authToken.split(" ");

  try {
    // Validate Token
    const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad;

    // Recover id from token and insert inside a variable user_id inside the Request.
    req.user_id = sub;

    return next();
  } catch (err) {
    return res.status(401).end();
  }
}
