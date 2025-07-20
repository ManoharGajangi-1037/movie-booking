import { Request, Response } from "express";
import z from "zod";
import { createMovie } from "../services/movie.service";
const movieSchema = z.object({
  title: z.string().min(1, "movie title is Required"),
  description: z.string().min(1, "movie description is Required"),
  duration: z.int().min(1, "Movie Duration is Required"),
  language: z.string().min(1, "movie language is Required"),
  rating: z.string().min(1, "movie rating is Required"),
  genre: z.string().min(1, "Movie genre is Required"),
});
export const create = async (req: Request, res: Response) => {
  try {
    const movieDetails = movieSchema.parse(req.body);
    const movie = await createMovie(movieDetails);
    res.status(201).json({ movie });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
