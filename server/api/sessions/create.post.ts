import { db } from "~~/server/helpers/db"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{ name: string }>(event)
    const name = body.name.trim()

    const check = await db.session.count({ where: { name } })
    if (check) throw new Error("A session already exists with that name")

    const data = await db.session.create({
      data: { name: body.name.trim() }
    })

    return { error: false, message: null, data }
  } catch (e: any) {
    return { error: true, message: e.message, data: null }
  }
})
