<script lang="ts" setup>
  definePageMeta({ layout: "global" })
</script>

<template>
  <Page title="Welcome to FUBK Staff Appraisal System">
    <div class="w-full h-screen flex-col-center text-center">
      <img src="/fubk.png" class="w-40 mb-5" />
      <h1 text="lg md:3xl" class="font-black uppercase c-accent-200">
        Welcome To Staff Appraisal System
      </h1>
      <h1 text="md:lg" class="font-extrabold uppercase my-5">
        FEDERAL UNIVERSITY, BIRNIN KEBBI
      </h1>
      <nuxt-link to="/start">
        <ui-button icon="i-tabler-arrow-right">Get Started</ui-button>
      </nuxt-link>
    </div>
  </Page>
</template>
