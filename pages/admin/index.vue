<script lang="ts" setup>
  const user = getAuthUser()
</script>

<template>
  <Page title="Welcome">
    <div class="w-full flex-col-center gap-10" v-if="user">
      <WelcomeUser :user="user" />

      <div class="w-full">
        <h3 class="font-semibold">
          You have a total of <span class="c-accent-200">20</span> unread
          reviews
        </h3>
      </div>
    </div>
  </Page>
</template>
