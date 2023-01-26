export default defineNuxtConfig({
  css: [
    "@anu-vue/preset-theme-default/dist/style.css",
    "assets/styles/base.scss"
  ],
  modules: ["@anu-vue/nuxt", "@vueuse/nuxt", "@unocss/nuxt", "@pinia/nuxt"],
  build: { transpile: ["@headlessui/vue"] },
  imports: { dirs: ["stores"], presets: ["pinia"] },
  unocss: { preflight: true },
  runtimeConfig: {
    cookieName: "session",
    cookieSecret: "supersecret"
  }
})
