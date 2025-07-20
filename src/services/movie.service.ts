import prisma from "../config/prisma";

interface movieDetails {
  title: string;
  description: string;
  duration: number;
  language: string;
  rating: string;
  genre: string;
}
export const createMovie = async ({
  title,
  description,
  duration,
  language,
  rating,
  genre,
}: movieDetails) => {
  return await prisma.movie.create({
    data: {
      description,
      duration,
      genre,
      language,
      rating,
      title,
    },
  });
};
