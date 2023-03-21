import { fetchLecturerByID } from "~~/server/modules/lecturer/lecturer.model"

export default defineEventHandler(async (event) => {
  try {
    const data = await fetchLecturerByID(event.context.params.id)
    return { error: false, message: null, data }
  } catch (e: any) {
    return { error: true, message: e.message, data: null }
  }
})
