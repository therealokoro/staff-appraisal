import type { CreateQuestionInput, EditQuestionInput } from "./question.schema"
import { sentenceCase } from "change-case"
import { db } from "~~/server/helpers/db"

export const createQuestion = async (input: CreateQuestionInput) => {
  const check = await db.question.count({
    where: { body: input.body }
  })

  if (check)
    throw new Error("A question already exists with the following info")

  return await db.question.create({ data: { body: sentenceCase(input.body) } })
}

export const editQuestion = async (id: string, input: EditQuestionInput) => {
  const check = await db.question.count({
    where: { body: input.body }
  })

  if (check)
    throw new Error("A question already exists with the following info")

  return await db.question.update({
    where: { id },
    data: { body: input.body && sentenceCase(input.body) }
  })
}

export const deleteQuestion = async (id: string) => {
  return await db.question.delete({ where: { id } })
}

export const fetchQuestions = async () => {
  return await db.question.findMany()
}
