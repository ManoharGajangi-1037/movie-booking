import prisma from "../config/prisma";

interface screenData {
  name: string;
  theaterId: string;
}
export const createScreen = async ({ name, theaterId }: screenData) => {
  //Validate theater exists
  const theater = await prisma.theater.findUnique({ where: { id: theaterId } });

  if (!theater) {
    throw new Error("Theater Not Found");
  }

  return await prisma.screen.create({
    data: {
      name: name,
      theater: {
        connect: {
          id: theaterId,
        },
      },
    },
  });
};
