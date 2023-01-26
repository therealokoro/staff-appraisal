import { plugin, defaultConfig } from "@formkit/vue"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(plugin, defaultConfig)
})
