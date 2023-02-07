import type {
  CreateUserInput,
  EditUserInput,
  LoginUserInput
} from "./auth.schema"
import { db } from "~~/server/helpers/db"
import { sentenceCase } from "change-case"
import * as bcrypt from "bcrypt"

export const createNewUser = async (input: CreateUserInput) => {
  const check = await db.user.count({
    where: { OR: [{ loginID: input.admissionNo }] }
  })

  if (check) throw new Error("A user already exists with the following info")

  const user = await db.user.create({
    data: {
      loginID: input.admissionNo,
      password: await bcrypt.hash(input.password, 10),
      role: input.role,
      profile: {
        create: {
          level: input.level,
          admissionNo: input.admissionNo,
          surname: sentenceCase(input.surname),
          firstname: sentenceCase(input.firstname)
        }
      }
    },
    include: { profile: true }
  })

  return { ...user }
}

export const editUserInfo = async (id: string, input: EditUserInput) => {
  const check = await db.user.findUnique({
    where: { loginID: input.admissionNo }
  })

  if (check && check.id !== id)
    throw new Error("A user already exists with the following info")

  const user = await db.user.update({
    where: { id },
    data: {
      loginID: input.admissionNo,
      profile: {
        update: {
          level: input.level,
          admissionNo: input.admissionNo,
          surname: sentenceCase(input.surname),
          firstname: sentenceCase(input.firstname)
        }
      }
    },
    include: { profile: true }
  })

  return { ...user }
}

export const loginUser = async (input: LoginUserInput) => {
  const user = await db.user.findUnique({
    where: { loginID: input.loginID },
    include: { profile: true }
  })

  if (!user) throw new Error("Incorrect login credentials provided")

  const verifyPass = await bcrypt.compare(input.password, user.password)
  if (!verifyPass) throw new Error("Incorrect login credentials provided")

  return user
}
