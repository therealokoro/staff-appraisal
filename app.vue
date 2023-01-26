<script setup lang="ts">
  useHead({
    titleTemplate: (t: any) =>
      t ? `${t} | FUBK Staff Appraisal` : "FUBK Staff Appraisal",
    link: [
      {
        rel: "icon",
        type: "image/png",
        href: "/fubk.png"
      }
    ]
  })
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
