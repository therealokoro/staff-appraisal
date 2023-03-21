import {
  deleteLecturer,
  queryLecturerList
} from "~~/server/modules/lecturer/lecturer.model"

export default defineEventHandler(async (event) => {
  try {
    await deleteLecturer(event.context.params.id)
    const data = await queryLecturerList({})
    return { error: false, message: null, data }
  } catch (e: any) {
    return { error: true, message: e.message, data: null }
  }
})
