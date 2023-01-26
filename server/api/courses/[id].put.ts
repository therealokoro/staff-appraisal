import {
  editCourse,
  queryCourseList
} from "~~/server/modules/course/course.model"
import { EditCourseSchema } from "~~/server/modules/course/course.schema"

export default defineEventHandler(async (event) => {
  try {
    const input = EditCourseSchema.parse(await readBody(event))
    await editCourse(event.context.params.id, input)
    const data = await queryCourseList({})
    return { error: false, message: null, data }
  } catch (e: any) {
    return { error: true, message: e.message, data: null }
  }
})
