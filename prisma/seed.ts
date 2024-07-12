import { PrismaClient } from "@prisma/client";
import { dishesData } from "../src/data/dishes-mock";

const prisma = new PrismaClient();

async function main() {
  await prisma.dishes.createMany({
    data: dishesData,
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
