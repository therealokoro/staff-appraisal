<script lang="ts" setup>
  import { IQuestion } from "~~/types/question"

  const { getQuestionList } = storeToRefs(useQuestionStore())
  const { deleteQuestion, editQuestionInfo } = useQuestionStore()

  const questionList = computed(() => getQuestionList.value || [])
  const editModal = ref(false)

  const currentQuestion = ref<IQuestion | null>(null)

  function initEditQuestion(question: IQuestion) {
    currentQuestion.value = question
    editModal.value = true
  }

  async function handleEditQuestion(data: any) {
    try {
      await editQuestionInfo(currentQuestion.value!.id, data)
      Alerts.success("Question info updated successfully")
      editModal.value = false
    } catch (e: any) {
      Alerts.error(e)
    }
  }

  function initDeleteQuestion(question: IQuestion) {
    const { showDialog } = useDialogs()
    showDialog("Are you sure you want to delete this question", async () => {
      try {
        await deleteQuestion(question.id)
        Alerts.success("Question was deleted successfully")
      } catch (e: any) {
        Alerts.error(e)
      }
    })
  }
</script>

<template>
  <div class="w-full">
    <div
      v-if="questionList.length"
      class="w-full"
      grid="~ cols-1 md:cols-2 gap-3"
    >
      <div
        v-for="question in questionList"
        :key="question.id"
        class="bg-base-100 p-5 shadow space-y-1 flex items-center justify-between"
      >
        <div class="space-y-1">
          <p class="text-0.9rem font-bold">{{ question.body }}</p>
        </div>

        <div class="flex items-center gap-2 text-sm">
          <ui-button
            icon="i-tabler-trash"
            color="danger"
            variant="text"
            @click="initDeleteQuestion(question)"
          >
            Delete
          </ui-button>
          <ui-button
            icon="i-tabler-pencil"
            variant="text"
            @click="initEditQuestion(question)"
          >
            Edit
          </ui-button>
        </div>
      </div>
    </div>

    <p class="text-0.9rem" v-else>There are no questions to display</p>

    <UiModal v-model="editModal" title="Edit Question Info">
      <FormKit
        :value="currentQuestion"
        type="form"
        @submit="handleEditQuestion"
      >
        <FormKit
          type="text"
          name="body"
          label="Question Body"
          placeholder="Enter the question body here"
          validation="required"
        />
      </FormKit>
    </UiModal>
  </div>
</template>
