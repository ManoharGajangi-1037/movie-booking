import { Request, Response } from "express";
import { createUser, loginUser } from "../services/user.service";
import { z } from "zod";
const userDataSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  email: z.string().email("Invalid Email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["ADMIN", "CUSTOMER"]).optional(),
});
export const signup = async (req: Request, res: Response) => {
  try {
    const userData = userDataSchema.parse(req.body);
    const user = await createUser(userData);
    res.status(201).json({ user });
  } catch (error: unknown) {
    res.status(400).json({ error: error as Error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.json({ user, token });
  } catch (error: unknown) {
    res.status(400).json({ error: error as Error });
  }
};
