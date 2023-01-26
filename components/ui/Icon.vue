<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      icon?: string
      raw?: string
      circle?: boolean
      as?: string
      plain?: boolean
      size?: string
      bg?: string
      bgAlt?: boolean
    }>(),
    { as: "span", noShadow: false, bg: "bg-base-100" }
  )
  const addHover = computed(() =>
    ["button", "nuxt-link"].includes(props.as) ? "hover:c-accent-200" : ""
  )

  const bgColor = computed(() => (props.bgAlt ? "bg-base-200" : props.bg))
</script>

<template>
  <component
    :is="as"
    :class="[
      'text-base text-center inline-flex items-center focus:accent-outline',
      addHover,
      plain == true ? '' : `${bgColor} p-1.5 md:p-2.2`,
      circle ? 'rounded-full' : 'rounded-md'
    ]"
  >
    <!-- show unocss icon if icon is string -->
    <span v-if="icon" :class="icon" />

    <!-- render icon if icon is component -->
    <span v-if="raw" v-html="raw" :class="size ? size : 'w-3.5'" />
  </component>
</template>
