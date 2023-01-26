<script lang="ts" setup>
  const showModal = ref(false)
  const { CourseSchema } = useFormSchemas()
  const { createNewCourse, fetchCourses } = useCourseStore()

  tryOnBeforeMount(async () => await fetchCourses({}))

  async function handleCreateCourse(data: any) {
    try {
      await createNewCourse(data)
      Alerts.success("New course created successfully")
      showModal.value = false
    } catch (e: any) {
      Alerts.error(e)
    }
  }
</script>

<template>
  <Page title="Courses" spacing>
    <div class="space-y-2">
      <h1 class="font-bold text-lg">Departmental Courses</h1>
      <p class="text-0.8rem font-medium c-content-100">
        Below is a list of all departmental courses and their lecturers
      </p>
      <ui-button @click="showModal = true" text-0.8rem
        >Create New Course</ui-button
      >
    </div>

    <AdminCourseList />

    <UiModal v-model="showModal" title="Create Course">
      <FormKit type="form" @submit="handleCreateCourse">
        <div class="w-full space-y-4">
          <FormKitSchema :schema="CourseSchema" />
        </div>
      </FormKit>
    </UiModal>
  </Page>
</template>
