import {
  editLecturer,
  queryLecturerList
} from "~~/server/modules/lecturer/lecturer.model"
import { EditLecturerSchema } from "~~/server/modules/lecturer/lecturer.schema"

export default defineEventHandler(async (event) => {
  try {
    const input = EditLecturerSchema.parse(await readBody(event))
    await editLecturer(event.context.params.id, input)
    const data = await queryLecturerList({})
    return { error: false, message: null, data }
  } catch (e: any) {
    return { error: true, message: e.message, data: null }
  }
})
