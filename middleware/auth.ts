export default defineNuxtRouteMiddleware(async (to) => {
  const user = getAuthUser()

  const routeMap = {
    STUDENT: "/home",
    ADMIN: "/admin"
  }

  if (to.path == "/start" && user != null)
    await navigateTo(routeMap[user?.role])
})
