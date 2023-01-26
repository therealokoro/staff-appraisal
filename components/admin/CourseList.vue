<script lang="ts" setup>
  import { ICourse } from "~~/types/course"

  const { getCourseList } = storeToRefs(useCourseStore())
  const { deleteCourse, editCourseInfo } = useCourseStore()

  const courseList = computed(() => getCourseList.value || [])
  const editModal = ref(false)

  const { CourseSchema } = useFormSchemas()
  const currentCourse = ref<ICourse | null>(null)

  function initEditCourse(course: ICourse) {
    currentCourse.value = course
    editModal.value = true
  }

  async function handleEditCourse(data: any) {
    try {
      await editCourseInfo(currentCourse.value!.id, data)
      Alerts.success("Course info updated successfully")
      editModal.value = false
    } catch (e: any) {
      Alerts.error(e)
    }
  }

  function initDeleteCourse(course: ICourse) {
    const { showDialog } = useDialogs()
    showDialog("Are you sure you want to delete this course", async () => {
      try {
        await deleteCourse(course.id)
        Alerts.success("Course was deleted successfully")
      } catch (e: any) {
        Alerts.error(e)
      }
    })
  }
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
      >
        <div class="space-y-1">
          <p class="text-sm font-semibold">
            ({{ course.courseCode }}) - <b>{{ course.level }} LEVEL</b>
          </p>
          <p class="text-0.9rem font-bold">{{ course.title }}</p>
          <p class="text-sm font-semibold c-accent-200">
            {{ course.lecturer }}
          </p>
        </div>

        <div class="flex items-center gap-2 text-sm">
          <ui-button
            icon="i-tabler-trash"
            color="danger"
            variant="text"
            @click="initDeleteCourse(course)"
          >
            Delete
          </ui-button>
          <ui-button
            icon="i-tabler-pencil"
            variant="text"
            @click="initEditCourse(course)"
          >
            Edit
          </ui-button>
        </div>
      </div>
    </div>

    <p class="text-0.9rem" v-else>There are no courses to display</p>

    <UiModal v-model="editModal" title="Edit Course Info">
      <FormKit :value="currentCourse" type="form" @submit="handleEditCourse">
        <div class="w-full space-y-4">
          <FormKitSchema :schema="CourseSchema" />
        </div>
      </FormKit>
    </UiModal>
  </div>
</template>
