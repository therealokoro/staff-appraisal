<script lang="ts" setup>
  const { queryReviews } = useReviewStore()
  const user = getAuthUser()

  const { data: reviews, pending } = await useAsyncData(async () => {
    try {
      return await queryReviews({})
    } catch (e: any) {
      Alerts.error(e.message)
    }
  })
</script>

<template>
  <Page title="Reviews">
    <div class="w-full flex-col-center gap-10" v-if="user">
      <WelcomeUser :user="user" />

      <div class="w-full" v-if="pending">
        {{ reviews }}
      </div>
    </div>
  </Page>
</template>
