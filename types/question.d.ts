import { Question, Prisma } from "@prisma/client"

export interface IQuestion extends Question {}

export type QuestionStoreState = {
  questionList: IQuestion[]
}
