import { acceptHMRUpdate, defineStore } from "pinia"
import { CreateUserInput } from "~~/server/modules/auth/auth.schema"
import { IUser } from "~~/types/auth"

export const useAuthStore = defineStore("AuthStore", {
  actions: {
    async createNewUser(input: CreateUserInput) {
      const res = await useApi.post<IUser>("auth/register", {
        ...input,
        role: "STUDENT"
      })

      if (res.error) return Promise.reject(res.message)
      return Promise.resolve(res.data)
    }
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
