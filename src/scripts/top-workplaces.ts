import { PrismaClient } from "@prisma/client";

// Create an instance of PrismaClient
const prisma = new PrismaClient();

async function fetchTopWorkplaces(): Promise<void> {
  try {
    // Step 1: Fetch all workplaces with their shifts
    const workplaces = await prisma.workplace.findMany({
      include: {
        shifts: true,
      },
    });

    console.log("workplaces",workplaces)
    // Step 2: Aggregate shifts by workplace ID
    const workplacesWithShiftCounts = workplaces.map((workplace: any) => ({
      name: workplace.name,
      shifts: workplace.shifts.length, // Count the number of shifts for each workplace
    }));
    console.log('workplacesWithShiftCounts',workplacesWithShiftCounts);
    // Step 3: Sort workplaces by shift count in descending order
    const sortedWorkplaces = workplacesWithShiftCounts.sort((a:any, b:any) => b.shifts - a.shifts);
    console.log(sortedWorkplaces);
    // Step 4: Take the top 3 workplaces
    const topWorkplaces = sortedWorkplaces.slice(0, 3);
    console.log('topWorkplaces',topWorkplaces)
    // Step 5: Output the result
  } catch (error: unknown) {
    // Error handling: type guard for 'error'
    if (error instanceof Error) {
      console.error("Error fetching data:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
  } finally {
    // Ensure the Prisma Client is disconnected after the query
    await prisma.$disconnect();
  }
}
fetchTopWorkplaces();
