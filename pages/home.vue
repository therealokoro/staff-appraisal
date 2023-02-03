<script lang="ts" setup>
  const user = getAuthUser()

  const { fetchStudentCourses } = useCourseStore()
  const isShowingCourses = ref(false)

  const { pending, error } = await useAsyncData(async () => {
    try {
      const user = getAuthUser()
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
        <!-- <p class="font-semibold">Search for a lecture or a course to review</p>
        <div
          class="w-80vw md:w-md flex items-center bg-base-100 border-gray-200 border-2 px-4 focus-within:border-accent-200"
        >
          <i class="i-tabler-search" />
          <input
            type="text"
            class="w-full border-0 focus:ring-0"
            placeholder="Enter lecturer's name or course"
          />
        </div>

        <ui-button variant="text" @click="viewAllCourses">
          View All Courses
        </ui-button> -->
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
