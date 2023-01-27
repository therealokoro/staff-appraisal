import {
  editQuestion,
  fetchQuestions
} from "~~/server/modules/question/question.model"
import { EditQuestionSchema } from "~~/server/modules/question/question.schema"

export default defineEventHandler(async (event) => {
  try {
    const input = EditQuestionSchema.parse(await readBody(event))
    await editQuestion(event.context.params.id, input)
    const data = await fetchQuestions()
    return { error: false, message: null, data }
  } catch (e: any) {
    return { error: true, message: e.message, data: null }
  }
})
