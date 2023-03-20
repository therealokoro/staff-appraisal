<script lang="ts" setup>
  import type {
    CourseResult,
    SafeIReview,
    ICourseResultDetail
  } from "~~/composables/review"

  const user = getAuthUser()
  const { queryReviews } = useReviewStore()
  const currentSession = ref("")
  const [detailsModal, toggleDetailsModal] = useToggle()
  const currentDetails = ref<
    { question: string; "Total Score": number }[] | null
  >(null)

  const { data: sessions } = await useLazyAsyncData(async () => {
    const currSession = await $fetch("/api/sessions/current")
    currentSession.value! != currSession?.data
    const res = await $fetch("/api/sessions")
    return res.data
  })

  const renderResults = ref<CourseResult[]>([])
  const noReviewMsg = ref("")

  const { data: allReviews } = await useAsyncData(async () => {
    try {
      return await queryReviews({})
    } catch (e: any) {
      Alerts.error(e.message)
    }
  })

  watch(currentSession, async (session) => {
    if (allReviews.value) {
      const filtered = allReviews.value?.filter(
        (review) => review.sessionId == session
      )

      if (!filtered.length)
        noReviewMsg.value = "There are no reviews for this session"

      renderResults.value = useeReviewCalculator(filtered as SafeIReview[])
    }
  })

  function showReviewDetails(details: ICourseResultDetail[]) {
    currentDetails.value = details.map((curr) => ({
      question: curr.body,
      "Total Score": curr.totalScore
    }))
    toggleDetailsModal()
  }
</script>

<template>
  <Page title="Reviews">
    <div class="w-full flex-col-center gap-10" v-if="user">
      <WelcomeUser :user="user" />

      <div class="w-full flex-col-center gap-3">
        <h2 class="text-md font-semibold">
          Select Session to view review results
        </h2>
        <div class="w-1/2 flex-center flex-wrap gap-3" v-if="sessions">
          <ui-button
            :variant="currentSession == session.id ? 'fill' : 'outline'"
            class="text-md"
            v-for="session in sessions"
            :key="session.id"
            @click="currentSession = session.id"
          >
            {{ session.name }}
          </ui-button>
        </div>
      </div>

      <div
        class="w-full"
        grid="~ cols-1 md:cols-2 gap-5"
        v-if="renderResults.length"
      >
        <div
          class="bg-base-100 p-5 shadow space-y-1 flex items-center justify-between"
          v-for="result in renderResults"
          @click=""
        >
          <div class="flex-1 space-y-2">
            <p class="text-sm font-semibold">
              ({{ result.course.courseCode }}) -
              <b>{{ result.course.level }} LEVEL</b>
            </p>
            <p class="text-0.9rem font-bold">{{ result.course.title }}</p>
            <p class="text-sm font-semibold c-accent-200">
              {{ result.course.lecturer }}
            </p>
            <ui-button
              @click="showReviewDetails(result.details)"
              class="text-xs"
              variant="light"
            >
              View Details
            </ui-button>
          </div>

          <div class="flex-col-center gap-2">
            <p text-sm font-semibold>Total Score</p>
            <span c-accent-200 text-2xl font-bold>{{ result.totalScore }}</span>
            <p text-sm font-semibold>Reviews: {{ result.reviewCount }}</p>
          </div>
        </div>
      </div>

      <div class="w-fill" v-else>
        <h2 class="text-md font-semibold">
          {{ noReviewMsg }}
        </h2>
      </div>

      <UiModal v-model="detailsModal" title="Review Details" width="w-50vw">
        <div class="w-full" v-if="currentDetails">
          <h3 mb-5 font-semibold>
            Below shows the total value scored for each question
          </h3>
          <ATable
            :rows="currentDetails"
            class="shadow-none text-lg font-bold"
          />
        </div>
      </UiModal>
    </div>
  </Page>
</template>
