import type { CreateCourseInput, EditCourseInput } from "./course.schema"
import { sentenceCase, capitalCase } from "change-case"
import { db } from "~~/server/helpers/db"
import { QueryCourseInput } from "~~/types/course"

export const createCourse = async (input: CreateCourseInput) => {
  const check = await db.course.count({
    where: {
      OR: [{ courseCode: input.courseCode }, { title: input.title }]
    }
  })

  if (check) throw new Error("A course already exists with the following info")

  return await db.course.create({
    data: {
      title: sentenceCase(input.title),
      courseCode: input.courseCode.toUpperCase(),
      lecturer: capitalCase(input.lecturer),
      level: input.level
    }
  })
}

export const editCourse = async (id: string, input: EditCourseInput) => {
  const check = await db.course.count({
    where: {
      NOT: { id },
      OR: [{ courseCode: input.courseCode }, { title: input.title }]
    }
  })

  if (check) throw new Error("A course already exists with the following info")

  return await db.course.update({
    where: { id },
    data: {
      title: input.title && sentenceCase(input.title),
      courseCode: input.courseCode && input.courseCode.toUpperCase(),
      lecturer: input.lecturer && capitalCase(input.lecturer),
      level: input.level
    }
  })
}

export const deleteCourse = async (id: string) => {
  return await db.course.delete({ where: { id } })
}

export const queryCourseList = async (query: QueryCourseInput) => {
  return await db.course.findMany({ where: { ...query } })
}

export const queryStudentCourseList = async (
  studentId: string,
  query: QueryCourseInput
) => {
  const allCourses = await db.course.findMany({ where: { ...query } })

  const currSessionID = await db.schoolInfo.findFirst()

  const sessionQuery = currSessionID ? { sessionId: currSessionID.session } : {}

  const reviewed = await db.review.findMany({
    where: { ...sessionQuery, studentId }
  })

  return allCourses.map((course) => ({
    ...course,
    reviewed: reviewed.some((curr) => curr.courseId == course.id)
  }))
}

export const fetchCourseByID = async (id: string) => {
  return await db.course.findUnique({ where: { id } })
}
