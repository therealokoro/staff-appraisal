import { Course, Prisma, Review } from "@prisma/client"
import { ILecturer } from "./lecturer"
import { IReview } from "./review"

export interface ICourse extends Course {
  reviews: IReview[]
  lecturer: ILecturer
}

export type IStudentCourseList = ICourse & {
  reviewed: boolean
}

export type CourseStoreState = {
  courseList: ICourse[]
}

export type QueryCourseInput = Prisma.CourseWhereInput
