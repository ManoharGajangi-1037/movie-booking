import { Request, Response } from 'express';
import { z } from 'zod';
import { createSeatsBulk } from '../services/seat.service';

const seatBulkSchema = z.object({
  rows: z.array(z.string().min(1)).min(1, 'At least one row is required'),
  seatsPerRow: z.number().int().min(1, 'Seats per row must be at least 1'),
});

export const createBulk = async (req: Request, res: Response) => {
  try {
    const { screenId } = req.params;
    const seatData = seatBulkSchema.parse(req.body);
    const seats = await createSeatsBulk({ ...seatData, screenId });
    res.status(201).json(seats);
  } catch (error: unknown) {
    res.status(400).json({ error: (error as Error).message });
  }
};