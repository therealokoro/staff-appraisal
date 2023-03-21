<script lang="ts" setup>
  import type { IStudentCourseList } from "~~/types/course"
  const { getCourseList } = storeToRefs(useCourseStore())
  const courseList = computed(
    () => (getCourseList.value as IStudentCourseList[]) || []
  )
</script>

<template>
  <div class="w-full">
    <div
      v-if="courseList.length"
      class="w-full"
      grid="~ cols-1 md:cols-2 gap-3"
    >
      <div
        v-for="course in courseList"
        :key="course.id"
        class="bg-base-100 p-5 shadow space-y-1 flex items-center justify-between"
        :class="course.reviewed ? 'opacity-30 cursor-not-allowed' : ''"
        :title="course.reviewed ? 'You have reviewed this course already' : ''"
      >
        <div class="space-y-1">
          <p class="text-sm font-semibold">
            ({{ course.courseCode }}) - <b>{{ course.level }} LEVEL</b>
          </p>
          <p class="text-0.9rem font-bold">{{ course.title }}</p>
          <p class="text-sm font-semibold c-accent-200">
            {{
              course.lecturer?.title +
              " " +
              course.lecturer?.surname +
              " " +
              course.lecturer?.firstname
            }}
          </p>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <ui-button
            icon="i-tabler-pencil"
            @click="navigateTo(`/review/${course.id}`)"
            variant="text"
            :disabled="course.reviewed"
          >
            Review Course
          </ui-button>
        </div>
      </div>
    </div>

    <p class="text-0.9rem" v-else>There are no courses to display</p>
  </div>
</template>
