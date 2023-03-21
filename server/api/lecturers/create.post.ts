import {
  createLecturer,
  queryLecturerList
} from "~~/server/modules/lecturer/lecturer.model"
import { CreateLecturerSchema } from "~~/server/modules/lecturer/lecturer.schema"

export default defineEventHandler(async (event) => {
  try {
    const input = CreateLecturerSchema.parse(await readBody(event))
    await createLecturer(input)
    const data = await queryLecturerList({})
    return { error: false, message: null, data }
  } catch (e: any) {
    return { error: true, message: e.message, data: null }
  }
})
