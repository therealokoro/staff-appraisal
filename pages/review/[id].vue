<script lang="ts" setup>
  const { fetchSingleCourse } = useCourseStore()

  const { data: course } = useAsyncData(async () => {
    const id = useRoute().params.id.toString()
    return await fetchSingleCourse(id)
  })

  const courseInfoTable = computed(() => {
    return {
      Title: course.value?.title,
      "Course Code": course.value?.courseCode,
      Lecturer: course.value?.lecturer,
      Level: `${course.value?.level} LEVEL`
    }
  })

  const Instructions = [
    "You are required to answer all questions provided below",
    "Each questions can be answered using a star rating, ranging from 1-5",
    "Before submitting your review, please go over your answers one more time",
    "Reviews cannot be edited once submitted"
  ]

  const questions = ref([
    {
      id: "1",
      value: 0,
      body: "How well do you think the teachers knows the course"
    },
    { id: "2", value: 2, body: "God bless PD..APC, God..God bless PD..APC" },
    {
      id: "3",
      value: 3,
      body: "A townhall different from bala blu, bluhu, bulaba"
    },
    {
      id: "4",
      value: 4,
      body: "Buhari....buhari.....buhari...say it again...buhari"
    }
  ])

  async function handleSubmitReview() {
    const isNotValid = useArraySome(questions, ({ value }) => value != 0)

    if (isNotValid.value) {
      Alerts.warn("Please pass a value to all review questions")
      return
    }
  }
</script>

<template>
  <Page title="Review">
    <div v-if="course" class="space-y-6">
      <div class="space-y-2">
        <h1 class="font-bold text-lg">Course Review Page</h1>
        <p class="text-0.9rem font-medium c-content-100">
          Note that you can only review a course once per semester.
        </p>
      </div>

      <div class="w-full" grid="~ cols-1 lg:cols-2 gap-5">
        <!-- Course Info -->
        <div class="bg-base-100 p-6">
          <h3 font-bold>Course Info</h3>

          <div class="w-full mt-4">
            <li
              v-for="(value, key) in courseInfoTable"
              text="sm md:0.89rem"
              class="font-semibold p-2"
              grid="~ cols-2 gap-2"
            >
              <span c-accent-200>{{ key }}:</span>
              <span break-words>{{ value }}</span>
            </li>
          </div>
        </div>

        <!-- Instructions -->
        <div class="bg-blue-50 p-6 children:c-accent-200">
          <h3 font-bold>Instructions</h3>

          <div class="w-full mt-4">
            <li
              v-for="item in Instructions"
              text="sm md:0.8rem"
              class="font-semibold p-2"
            >
              <span>{{ item }}</span>
            </li>
          </div>
        </div>
      </div>

      <!-- Questions -->
      <div class="w-full bg-base-100 p-7 space-y-5">
        <h3 font-bold>Review Questions</h3>

        <div class="w-full space-y-5">
          <div
            v-for="item in questions"
            :key="item.id"
            class="text-0.8rem w-full px-2 flex flex-wrap items-center justify-center md:justify-between"
          >
            <h3 font-semibold c-accent-200>{{ item.body }}</h3>
            <a-rating
              class="text-0.9rem"
              color="c-accent-200"
              v-model="item.value"
              half
            />
          </div>
        </div>

        <div class="flex-center">
          <ui-button @click="handleSubmitReview">Submit Review</ui-button>
        </div>
      </div>
    </div>
  </Page>
</template>
