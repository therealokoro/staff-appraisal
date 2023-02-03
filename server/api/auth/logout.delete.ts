import { clearUserSession } from "~~/server/helpers/session"

export default defineEventHandler(async (event) => {
  clearUserSession(event)
  return { error: false, message: null, data: null }
})
