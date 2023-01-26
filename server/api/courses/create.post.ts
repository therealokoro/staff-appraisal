import {
  createCourse,
  queryCourseList
} from "~~/server/modules/course/course.model"
import { CreateCourseSchema } from "~~/server/modules/course/course.schema"

export default defineEventHandler(async (event) => {
  try {
    const input = CreateCourseSchema.parse(await readBody(event))
    await createCourse(input)
    const data = await queryCourseList({})
    return { error: false, message: null, data }
  } catch (e: any) {
    return { error: true, message: e.message, data: null }
  }
})
