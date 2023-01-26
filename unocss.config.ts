import { presetForms } from "@julr/unocss-preset-forms"
import { presetAnu, presetIconExtraProperties } from "anu-vue"
import { presetThemeDefault } from "@anu-vue/preset-theme-default"
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from "unocss"

export default defineConfig({
  theme: {
    colors: {
      base: {
        100: "#ffffff",
        200: "#fafafa",
        300: "#f5f5f5"
      },
      content: {
        100: "#8F94AA",
        200: "#4D536C",
        300: "#1C1E26"
      },
      accent: {
        100: "#72BDDC",
        200: "#0086BF",
        300: "#025F86"
      }
    },
    fontSize: {
      tiny: ".6rem",
      xs: ".64rem",
      sm: ".7rem",
      base: ".83rem",
      md: "1rem",
      lg: "1.3rem",
      xl: "1.5rem",
      "2xl": "1.9rem"
    },
    fontFamily: {
      base: "Poppins, sans-serif"
    }
  },
  shortcuts: {
    "accent-outline":
      "outline-none ring-3 ring-accent-300/50 dark:ring-accent-100/90",
    "card-focus": "focus:(outline-none ring-3 ring-accent-200/10)",
    "card-hover": "border-2 border-transparent hover:border-accent-200/20",
    "card-grid": "min-h-35 md:min-h-40 flex-center flex-col gap-5 text-center",

    "flex-center": "flex justify-center items-center",
    "flex-col-center": "flex flex-col justify-center items-center",
    "auto-container": "container mx-auto px-1.3rem lg:px-3rem xl:px-5rem",

    "form-input":
      "w-full h-auto p-3 ring-1 ring-base-300 text-sm c-content-200 placeholder-content-100 leading-5 bg-base-200 hover:bg-base-300 dark:hover:bg-base-300/30 rounded !border-base-300 !dark:border-base-200 !focus:accent-outline"
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        "flex-shrink": "0",
        display: "inline-block"
      }
    }),
    presetTypography(),
    presetForms(),

    // anu-vue preset
    presetAnu(),

    // default theme preset
    presetThemeDefault()
  ],
  include: [/.*\/anu-vue\.js(.*)?$/, "./**/*.vue", "./**/*.md"],
  transformers: [transformerDirectives(), transformerVariantGroup()]
})
