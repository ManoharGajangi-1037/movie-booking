import { Request, Response } from "express";
import { z } from "zod";
import { createTheater } from "../services/theater.service";
const theaterSchema = z.object({
  name: z.string().min(1, "Theatre is Required"),
  city: z.string().min(1, "City is Required"),
});
export const create = async (req: Request, res: Response) => {
  try {
    const theaterData = theaterSchema.parse(req.body);
    const theater = await createTheater(theaterData);
    res.status(201).json({ theater });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
