import { queryStudentCourseList } from "~~/server/modules/course/course.model"

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const studentId = event.context.params.id
    const data = await queryStudentCourseList(studentId, query)
    return { error: false, message: null, data }
  } catch (e: any) {
    return { error: true, message: e.message, data: null }
  }
})
