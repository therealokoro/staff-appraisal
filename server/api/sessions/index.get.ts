import { db } from "~~/server/helpers/db"

export default defineEventHandler(async () => {
  try {
    const data = await db.session.findMany()
    return { error: false, message: null, data }
  } catch (e: any) {
    return { error: true, message: e.message, data: null }
  }
})
