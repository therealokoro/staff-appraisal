import { SchoolInfo } from "@prisma/client"
import { db } from "~~/server/helpers/db"

export default defineEventHandler(async (event) => {
  try {
    let data = await db.schoolInfo.findFirst()
    if (!data) throw new Error("There is no active session yet")

    const { set, id } = getQuery(event)

    if (Boolean(set) && String(id)) {
      data = await db.schoolInfo.update({
        where: { id: data.id },
        data: { session: String(id) }
      })
    }

    return { error: false, message: null, data: data.session }
  } catch (e: any) {
    return { error: true, message: e.message, data: null }
  }
})
