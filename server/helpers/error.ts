import { ZodError } from "zod"

export const formatErrors = (e: any) => {
  const messages = []

  if (e instanceof ZodError) {
    e.issues.forEach((curr) => messages.push(curr.message))
  } else {
    messages.push(e.message)
  }

  return messages.length > 1 ? messages : messages[0]
}
