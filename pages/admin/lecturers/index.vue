<script lang="ts" setup>
  const showModal = ref(false)
  const { createNewLecturer, fetchLecturers } = useLecturerStore()
  const { CreateLecturerSchema } = useFormSchemas()

  tryOnBeforeMount(async () => await fetchLecturers({}))

  async function handleCreateLecturer(data: any) {
    try {
      await createNewLecturer(data)
      Alerts.success("New lecturer created successfully")
      showModal.value = false
    } catch (e: any) {
      Alerts.error(e)
    }
  }
</script>

<template>
  <Page title="Lecturers" spacing>
    <div class="space-y-2">
      <h1 class="font-bold text-lg">Departmental Lecturers</h1>
      <p class="text-0.8rem font-medium c-content-100">
        Below is a list of all registered lecturers in the department department
      </p>
      <ui-button @click="showModal = true" text-0.8rem>
        Create New Lecturer
      </ui-button>
    </div>

    <AdminLecturerList />

    <UiModal v-model="showModal" title="Create Lecturer">
      <FormKit type="form" @submit="handleCreateLecturer">
        <div class="w-full space-y-4">
          <FormKitSchema :schema="CreateLecturerSchema" />
        </div>
      </FormKit>
    </UiModal>
  </Page>
</template>
