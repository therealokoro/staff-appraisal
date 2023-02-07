import { editUserInfo } from "~~/server/modules/auth/auth.model"
import { EditUserSchema } from "~~/server/modules/auth/auth.schema"

export default defineEventHandler(async (event) => {
  try {
    const input = EditUserSchema.parse(await readBody(event))
    const { id } = getQuery(event)
    const data = await editUserInfo(String(id), input)
    return { error: false, message: null, data }
  } catch (e: any) {
    return { error: true, message: e.message, data: null }
  }
})
