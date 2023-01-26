import { formatErrors } from "~~/server/helpers/error"
import { createUserSession } from "~~/server/helpers/session"
import { loginUser } from "~~/server/modules/auth/auth.model"
import { LoginUserSchema } from "~~/server/modules/auth/auth.schema"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const input = LoginUserSchema.parse(body)

    const user = await loginUser(input)

    // create session
    createUserSession(event, { userId: user.id, role: user.role })

    return { error: false, message: null, data: user }
  } catch (e: any) {
    return { error: true, message: formatErrors(e), data: null }
  }
})
