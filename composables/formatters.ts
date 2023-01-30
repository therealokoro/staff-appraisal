export const useQueryString = (obj: { [x: string]: any }, prefix?: boolean) => {
  const keys = Object.keys(obj)
  const str = keys.map((key) => `${key}=${encodeURIComponent(obj[key])}`)
  const output = prefix == false ? str.join("&") : `?${str.join("&")}`
  return output
}
