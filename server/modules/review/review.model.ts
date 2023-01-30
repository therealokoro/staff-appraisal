import { db } from "~~/server/helpers/db"
import { QueryReviewsInput } from "~~/types/review"
import { CreateReviewInput } from "./review.schema"

export const createNewReview = async (input: CreateReviewInput) => {
  const check = await db.review.count({
    where: { courseId: input.courseId, studentId: input.studentId }
  })

  if (check) throw new Error("You cannot review this course twice")

  return await db.review.create({
    data: {
      courseId: input.courseId,
      studentId: input.studentId,
      results: input.results,
      isAnonynmous: input.isAnonynmous
    }
  })
}

export const queryReviews = async (query: QueryReviewsInput) => {
  return await db.review.findMany({
    where: { ...query },
    include: { course: true, student: true }
  })
}

export const fetchCourseReviews = async (courseId: string) => {
  return await db.review.findMany({
    where: { courseId },
    include: { course: true }
  })
}

export const fetchStudentReviews = async (studentId: string) => {
  return await db.review.findMany({
    where: { studentId },
    include: { student: true, course: true }
  })
}
