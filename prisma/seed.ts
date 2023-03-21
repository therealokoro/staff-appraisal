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
          surname: "Departmental",
          firstname: "Admin",
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

  await prisma.session.createMany({
    data: [
      {
        name: "2020/2021"
      },
      {
        name: "2021/2022"
      },
      {
        name: "2022/2023"
      }
    ]
  })

  const sessions = await prisma.session.findFirst()
  await prisma.schoolInfo.create({
    data: { session: sessions!.id }
  })

  console.log("Sessions created successfully")

  // await prisma.course.createMany({
  //   data: [
  //     {
  //       title: "Introduction to Computer Science",
  //       courseCode: "CSC101",

  //       level: "100"
  //     },
  //     {
  //       title: "History of Computer Science",
  //       courseCode: "CSC102",

  //       level: "100"
  //     },
  //     {
  //       title: "Introduction to Programming",
  //       courseCode: "CSC204",

  //       level: "200"
  //     }
  //   ]
  // })

  // console.log("Courses created successfully")

  await prisma.question.createMany({
    data: [
      { body: "Punctuality" },
      { body: "Knowledge of Course" },
      { body: "Friendliness" },
      { body: "Decency" }
    ]
  })

  console.log("Questions created successfully")
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
