import { Prisma, Lecturer } from "@prisma/client"
import { ICourse } from "./course"

export interface ILecturer extends Lecturer {
  courses: ICourse[]
}

export type LecturerStoreState = {
  lecturerList: ILecturer[]
}

export type QueryLecturerInput = Prisma.LecturerWhereInput
