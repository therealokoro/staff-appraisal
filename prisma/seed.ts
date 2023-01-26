import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"
const prisma = new PrismaClient()
async function main() {
  const HOD = await prisma.user.create({
    data: {
      loginID: "admin@gmail.com",
      password: bcrypt.hashSync("admin123", 10),
      role: "ADMIN",
      profile: {
        create: {
          surname: "Joseph",
          firstname: "Mathew",
          email: "admin@gmail.com"
        }
      }
    }
  })

  console.log("HOD account created successfully with loginID: ", HOD.loginID)

  const STUDENT = await prisma.user.create({
    data: {
      loginID: "1510204010",
      password: bcrypt.hashSync("123", 10),
      role: "STUDENT",
      profile: {
        create: {
          admissionNo: "1510204010",
          surname: "Okoro",
          firstname: "Redemption",
          level: "200"
        }
      }
    }
  })

  console.log(
    "STUDENT account created successfully with loginID: ",
    STUDENT.loginID
  )
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
