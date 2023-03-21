import { queryLecturerList } from "~~/server/modules/lecturer/lecturer.model"

export default defineEventHandler(async (event) => {
  try {
    const query = await readBody(event)
    const data = await queryLecturerList(query)
    return { error: false, message: null, data }
  } catch (e: any) {
    return { error: true, message: e.message, data: null }
  }
})
