import type { H3Event } from "h3"
import { addDays } from "date-fns"
import cookieSignature from "cookie-signature"
import { db } from "./db"

/**
 * Serializes any data
 * @param obj data to be serialized
 * @returns serialized data
 */
export function serializeData(obj: any) {
  const value = Buffer.from(JSON.stringify(obj), "utf-8").toString("base64")
  const length = Buffer.byteLength(value)

  if (length > 4096) throw new Error("Input value is too large")

  return value
}

/**
 * Deserializes a previously serialized data
 * @param value Serialized data value
 * @returns raw deserialized data
 */
export function deserializeData(value: string) {
  return JSON.parse(Buffer.from(value, "base64").toString("utf-8"))
}

/**
 * Signs a cookie
 * @param value cookie value to sign
 * @returns new cookie signature
 */
export function signCookie(value: string) {
  const config = useRuntimeConfig()
  return cookieSignature.sign(value, config.cookieSecret)
}

/**
 * Unsigns a previously signed cookie
 * @param value the signed cookie value
 * @returns unsigned cookie value
 */
export function unsignCookie(value: string) {
  const config = useRuntimeConfig()
  return cookieSignature.unsign(value, config.cookieSecret)
}

/**
 * Get current user session data
 * @param event H3 Event
 * @returns session data
 */
export async function getUserSession(event: H3Event) {
  const config = useRuntimeConfig()

  // get cookie from event
  const cookie = getCookie(event, config.cookieName)

  // return null if no cookie was found
  if (!cookie) return null

  // unsign the cookie
  const unsignedSession = unsignCookie(cookie)

  // return null if unsigned cookie returns null
  if (!unsignedSession) return null

  // deserialize cookie and get data
  const session = deserializeData(unsignedSession)

  const data = await db.user.findUnique({
    where: { id: session.userId },
    include: { profile: true }
  })

  return data
}

/**
 * Creates a new user session
 * @param event The current request event
 * @param data data to encode into session
 */
export const createUserSession = (
  event: H3Event,
  data: { userId: string; role?: string }
) => {
  const config = useRuntimeConfig()
  const session = serializeData(data)
  const signedSession = signCookie(session)

  setCookie(event, config.cookieName, signedSession, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    expires: addDays(new Date(), 5)
  })
}

/**
 * Clear current user session data
 * @param event H3 Event
 * @returns returns null
 */
export function clearUserSession(event: H3Event) {
  const config = useRuntimeConfig()

  deleteCookie(event, config.cookieName, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production"
  })

  return null
}
