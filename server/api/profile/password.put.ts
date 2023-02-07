import { db } from "~~/server/helpers/db"
import * as bcrypt from "bcrypt"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{ password: string }>(event)

    const { id } = getQuery(event)
    const password = await bcrypt.hash(body.password, 10)

    const data = await db.user.update({
      where: { id: String(id) },
      data: { password }
    })
    return { error: false, message: null, data }
  } catch (e: any) {
    return { error: true, message: e.message, data: null }
  }
})
