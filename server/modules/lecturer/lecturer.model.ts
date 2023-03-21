import type { CreateLecturerInput, EditLecturerInput } from "./lecturer.schema"
import { capitalCase } from "change-case"
import { db } from "~~/server/helpers/db"
import { QueryLecturerInput } from "~~/types/lecturer"

export const createLecturer = async (input: CreateLecturerInput) => {
  const check = await db.lecturer.count({
    where: {
      AND: [{ surname: input.surname }, { firstname: input.firstname }]
    }
  })

  if (check) throw new Error("A lecturer already exists with that name")

  return await db.lecturer.create({
    data: {
      title: input.title,
      surname: capitalCase(input.surname),
      firstname: capitalCase(input.firstname)
    }
  })
}

export const editLecturer = async (id: string, input: EditLecturerInput) => {
  const check = await db.lecturer.count({
    where: {
      NOT: { id },
      AND: [{ surname: input.surname }, { firstname: input.firstname }]
    }
  })

  if (check)
    throw new Error("A lecturer already exists with the following info")

  return await db.lecturer.update({
    where: { id },
    data: {
      title: input.title,
      surname: capitalCase(input.surname),
      firstname: capitalCase(input.firstname)
    }
  })
}

export const deleteLecturer = async (id: string) => {
  return await db.lecturer.delete({ where: { id } })
}

export const queryLecturerList = async (query: QueryLecturerInput) => {
  return await db.lecturer.findMany({
    where: { ...query },
    include: { courses: true }
  })
}

export const fetchLecturerByID = async (id: string) => {
  return await db.lecturer.findUnique({
    where: { id },
    include: { courses: true }
  })
}
