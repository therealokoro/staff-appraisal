import {
  createQuestion,
  fetchQuestions
} from "~~/server/modules/question/question.model"
import { CreateQuestionSchema } from "~~/server/modules/question/question.schema"

export default defineEventHandler(async (event) => {
  try {
    const input = CreateQuestionSchema.parse(await readBody(event))
    await createQuestion(input)
    const data = await fetchQuestions()
    return { error: false, message: null, data }
  } catch (e: any) {
    return { error: true, message: e.message, data: null }
  }
})
