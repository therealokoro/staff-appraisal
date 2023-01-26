import type { AuthCredientials, IUser } from "~~/types/auth"

export const useAuthUser = () => {
  return useState<IUser | null>("auth-user", () => null)
}

export const getAuthUser = () => {
  const auth = useAuthUser()
  return computed(() => auth.value || null).value
}

export const useAuth = () => {
  const authUser = useAuthUser()

  const setUser = (data: IUser | null) => {
    authUser.value = data
  }

  const setCookie = (cookie: any) => {
    cookie.value = cookie
  }

  async function signIn(credentials: AuthCredientials) {
    const res = await useApi.post<IUser>("auth/login", credentials)
    if (res.error) return Promise.reject(res.message)

    setUser(res.data)
    return Promise.resolve(res.data)
  }

  async function signOut() {
    const res = await useApi.delete<IUser>("auth/logout")
    if (res.error) return Promise.reject(res.message)

    setUser(res.data)
    return Promise.resolve(res.data)
  }

  async function refresh() {
    if (!authUser.value) {
      try {
        const data = await $fetch("/api/auth/refresh", {
          headers: useRequestHeaders(["cookie"]) as HeadersInit
        })
        setUser(data.user)
      } catch (error) {
        setCookie(null)
      }
    }

    return authUser
  }

  return { signIn, signOut, refresh }
}
