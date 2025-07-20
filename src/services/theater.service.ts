import { Request, Response } from "express";
import prisma from "../config/prisma";
import { create } from "../controllers/theater.controller";
interface theaterData {
  name: string;
  city: string;
}
export const createTheater = async (theaterData: theaterData) => {
  return prisma.theater.create({
    data: {
      city: theaterData.city,
      name: theaterData.name,
    },
  });
};
