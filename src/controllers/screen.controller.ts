import { Request, Response } from "express";
import { z } from "zod";
import { createScreen } from "../services/screen.service";
const screenSchema = z.object({
  name: z.string().min(1, "Screen is Required"),
});
export const create = async (req: Request, res: Response) => {
  try {
    const { theaterId } = req.params;
    const screenData = screenSchema.parse(req.body);
    const screen = await createScreen({ ...screenData, theaterId });
    res.status(201).json({
      screen,
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
