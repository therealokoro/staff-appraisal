<script lang="ts" setup>
  import { ICourse } from "~~/types/course"
  import { ILecturer } from "~~/types/lecturer"

  const { getLecturerList } = storeToRefs(useLecturerStore())
  const { deleteLecturer, editLecturerInfo } = useLecturerStore()

  const lecturerList = computed(() => getLecturerList.value || [])
  const editModal = ref(false)

  const { CreateLecturerSchema } = useFormSchemas()
  const currentLecturer = ref<ILecturer | null>(null)

  function flattenCourseList(courses: ICourse[]) {
    return courses.map((curr) => curr.courseCode).join(", ")
  }

  function initEditLecturer(lecturer: ILecturer) {
    currentLecturer.value = lecturer
    editModal.value = true
  }

  async function handleEditLecturer(data: any) {
    try {
      await editLecturerInfo(currentLecturer.value!.id, data)
      Alerts.success("Lecturer info updated successfully")
      editModal.value = false
    } catch (e: any) {
      Alerts.error(e)
    }
  }

  function initDeleteLecturer(lecturer: ILecturer) {
    const { showDialog } = useDialogs()
    showDialog("Are you sure you want to delete this lecturer", async () => {
      try {
        await deleteLecturer(lecturer.id)
        Alerts.success("Lecturer was deleted successfully")
      } catch (e: any) {
        Alerts.error(e)
      }
    })
  }
</script>

<template>
  <div class="w-full">
    <div
      v-if="lecturerList.length"
      class="w-full"
      grid="~ cols-1 md:cols-2 gap-3"
    >
      <div
        v-for="lecturer in lecturerList"
        :key="lecturer.id"
        class="bg-base-100 p-5 shadow space-y-1 flex items-center justify-between"
      >
        <div class="space-y-1">
          <p class="text-sm font-medium">
            {{ flattenCourseList(lecturer.courses) }}
          </p>
          <p class="text-0.9rem font-bold">
            {{
              lecturer.title + " " + lecturer.surname + " " + lecturer.firstname
            }}
          </p>
        </div>

        <div class="flex items-center gap-2 text-sm">
          <ui-button
            icon="i-tabler-trash"
            color="danger"
            variant="text"
            @click="initDeleteLecturer(lecturer)"
          >
            Delete
          </ui-button>
          <ui-button
            icon="i-tabler-pencil"
            variant="text"
            @click="initEditLecturer(lecturer)"
          >
            Edit
          </ui-button>
        </div>
      </div>
    </div>

    <p class="text-0.9rem" v-else>There are no lecturers to display</p>

    <UiModal v-model="editModal" title="Edit Lecturer Info">
      <FormKit
        :value="currentLecturer"
        type="form"
        @submit="handleEditLecturer"
      >
        <div class="w-full space-y-4">
          <FormKitSchema :schema="CreateLecturerSchema" />
        </div>
      </FormKit>
    </UiModal>
  </div>
</template>
