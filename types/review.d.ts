import type { Review } from "@prisma/client"
import type { ICourse } from "./course"

export interface IReview extends Review {}

export type AuthStoreState = {
  course: ICourse
}
