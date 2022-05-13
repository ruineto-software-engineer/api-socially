import { prisma } from "../database.js";

async function truncate() {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
}

export const e2eTestsRepository = {
  truncate,
};
