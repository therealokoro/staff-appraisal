<script lang="ts" setup>
  const showModal = ref(false)
  const { CourseSchema } = useFormSchemas()
  const { createNewCourse, fetchCourses } = useCourseStore()
  const { fetchLecturers, getLecturerList } = useLecturerStore()

  tryOnBeforeMount(async () => {
    await fetchCourses({})
    await fetchLecturers({})
  })

  const formSchema = [
    ...CourseSchema,
    {
      $formkit: "select",
      name: "lecturerId",
      label: "Lecturer",
      placeholder: "Select a lecturer for course",
      validation: "required",
      options: getLecturerList.map((curr) => ({
        label: `${curr.title} ${curr.surname} ${curr.firstname}`,
        value: curr.id
      }))
    }
  ]

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
      <ui-button @click="showModal = true" text-0.8rem>
        Create New Course
      </ui-button>
    </div>

    <AdminCourseList />

    <UiModal v-model="showModal" title="Create Course">
      <FormKit type="form" @submit="handleCreateCourse">
        <div class="w-full space-y-4">
          <FormKitSchema :schema="formSchema" />
        </div>
      </FormKit>
    </UiModal>
  </Page>
</template>
