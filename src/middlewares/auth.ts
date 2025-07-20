import { NextFunction, Response } from "express";
import { verifyToken } from "../utils/auth";
import { AuthenticationRequest } from "../types/customType";
export const authenticate = (
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      error: "No token Provided",
    });
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "InvalidToken" });
  }
};

export const authorizeAdmin = (
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role != "ADMIN") {
    return res.status(401).json({ error: "Admin Access Required" });
  }
  next();
};
