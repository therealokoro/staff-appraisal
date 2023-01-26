<script setup lang="ts">
  const props = defineProps<{
    title?: string
    description?: string
    spacing?: boolean
  }>()

  // set title and meta info for SEO
  useHead({ title: props.title && props.title })
</script>

<template>
  <main
    class="relative w-full"
    :class="spacing ? 'flex flex-col gap-10 md:gap-12' : ''"
  >
    <slot />
  </main>
</template>
