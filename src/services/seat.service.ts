import prisma from "../config/prisma";

interface seatBulkData {
  screenId: string;
  rows: string[];
  seatsPerRow: number;
}
export const createSeatsBulk = async ({
  screenId,
  rows,
  seatsPerRow,
}: seatBulkData) => {
  // Validate screen exists
  const screen = await prisma.screen.findUnique({ where: { id: screenId } });
  if (!screen) {
    throw new Error("Screen not found");
  }

  // Generate seat data (e.g., A1, A2, ..., B1, B2, ...)
  const seatData = rows.flatMap((row) =>
    Array.from({ length: seatsPerRow }, (_, i) => ({
      number: `${row}${i + 1}`,
      screenId,
    }))
  );

  // Create seats in a transaction
  await prisma.seat.createMany({
    data: seatData,
  });

  // Return created seats
  return prisma.seat.findMany({
    where: { screenId },
    orderBy: { number: "asc" },
  });
};
