import { Course, Prisma, Review } from "@prisma/client"
import { IReview } from "./review"

export interface ICourse extends Course {
  reviews: IReview[]
}

export type CourseStoreState = {
  courseList: ICourse[]
}

export type QueryCourseInput = Prisma.CourseWhereInput
