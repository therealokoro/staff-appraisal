<script lang="ts" setup>
  const user = getAuthUser()
  const { fetchStudentCourses } = useCourseStore()

  await useAsyncData(async () => {
    try {
      await fetchStudentCourses({ level: user!.profile.level as string })
    } catch (e: any) {
      Alerts.error(e)
    }
  })
</script>

<template>
  <Page title="Welcome">
    <div class="w-full flex-col-center gap-10" v-if="user">
      <WelcomeUser :user="user" />

      <div class="flex-col-center space-y-2 text-0.9rem">
        <a-alert color="info">
          <p class="text-0.8rem text-center">
            <b>Note:</b> Courses you have reviewed will be disabled!!
          </p>
        </a-alert>
      </div>

      <CourseList />
    </div>

    <div v-else class="inset-0 py-10 flex-col-center gap-5">
      <h1 class="font-semibold">Please Login to view this page</h1>
      <nuxt-link to="/start">
        <ui-button>Go to Login Page</ui-button>
      </nuxt-link>
    </div>
  </Page>
</template>
