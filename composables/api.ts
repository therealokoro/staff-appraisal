import { createFetch } from "@vueuse/core"
import type { ApiResponse } from "~~/types/app"

const BaseApi = createFetch({
  baseUrl: "/api/",
  options: {
    beforeFetch({ options }) {
      options.headers = {
        ...options.headers
        // ...(useRequestHeaders(["cookie"]) as HeadersInit)
      }
    }
  },
  fetchOptions: {
    mode: "cors"
  }
})

export const useApi = {
  post: async <T>(url: string, body?: Record<string, any>) => {
    const { data } = await BaseApi(url).post(body).json()
    const response: ApiResponse<T> = { ...data.value }
    return response
  },
  put: async <T>(url: string, body?: Record<string, any>) => {
    const { data } = await BaseApi(url).put(body).json()
    const response: ApiResponse<T> = { ...data.value }
    return response
  },
  delete: async <T>(url: string, body?: Record<string, any>) => {
    const { data } = await BaseApi(url).delete(body).json()
    const response: ApiResponse<T> = { ...data.value }
    return response
  },
  get: async <T>(url: string) => {
    const { data } = await BaseApi(url).json()
    const response: ApiResponse<T> = { ...data.value }
    return response
  }
}
