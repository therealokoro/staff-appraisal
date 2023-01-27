import {
  deleteQuestion,
  fetchQuestions
} from "~~/server/modules/question/question.model"

export default defineEventHandler(async (event) => {
  try {
    await deleteQuestion(event.context.params.id)
    const data = await fetchQuestions()
    return { error: false, message: null, data }
  } catch (e: any) {
    return { error: true, message: e.message, data: null }
  }
})
