import type { Review, Prisma } from "@prisma/client"
import { IUser } from "./auth"
import { ICourse } from "./course"

export interface IReview extends Review {
  student: IUser
  course: ICourse
}

export type ReviewStoreState = {
  currReview: IReview | null
  reviewList: IReview[]
}

export type QueryReviewsInput = Prisma.ReviewWhereInput
