import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "Your Json Web Token Key";

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, JWT_SECRET);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
};
