import type { IUser } from "~~/types/auth"

export default defineEventHandler(async (event) => {
  const contextUser = event.context.user as IUser
  const user = contextUser ? contextUser : null
  return { user }
})
