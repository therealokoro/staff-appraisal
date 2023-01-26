import { formatErrors } from "~~/server/helpers/error"
import { createUserSession } from "~~/server/helpers/session"
import { createNewUser } from "~~/server/modules/auth/auth.model"
import { CreateUserSchema } from "~~/server/modules/auth/auth.schema"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const input = CreateUserSchema.parse(body)

    const data = await createNewUser(input)

    // create session
    createUserSession(event, { userId: data.id, role: data.role })

    return { error: false, message: null, data }
  } catch (e: any) {
    return { error: true, message: formatErrors(e), data: null }
  }
})
