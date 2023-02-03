<script lang="ts" setup>
  const user = getAuthUser()

  const { queryReviews } = useReviewStore()

  const { data: reviews } = await useAsyncData(async () => {
    const res = await queryReviews({ studentId: user!.id })
    return res
  })
</script>

<template>
  <Page title="My Reviews">
    <div class="w-full flex-col-center gap-10" v-if="user">
      <WelcomeUser :user="user" />

      <pre>{{ reviews }}</pre>
    </div>

    <div v-else class="inset-0 py-10 flex-col-center gap-5">
      <h1 class="font-semibold">Please Login to view this page</h1>
      <nuxt-link to="/start">
        <ui-button>Go to Login Page</ui-button>
      </nuxt-link>
    </div>
  </Page>
</template>
