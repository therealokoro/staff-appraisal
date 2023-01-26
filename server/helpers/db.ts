import * as Prisma from "@prisma/client"

export const db = new Prisma.PrismaClient({
  errorFormat: "minimal"
})
