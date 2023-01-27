<script lang="ts" setup>
  const showModal = ref(false)
  const { createNewQuestion, fetchAllQuestions } = useQuestionStore()

  tryOnBeforeMount(async () => await fetchAllQuestions())

  async function handleQuestionQuestion(data: any) {
    try {
      await createNewQuestion(data)
      Alerts.success("New question created successfully")
      showModal.value = false
    } catch (e: any) {
      Alerts.error(e)
    }
  }
</script>

<template>
  <Page title="Questions" spacing>
    <div class="space-y-2">
      <h1 class="font-bold text-lg">Manage Questions</h1>
      <p class="text-0.8rem font-medium c-content-100">
        Create, edit or delete the review questions which will be answered by
        students
      </p>
      <ui-button @click="showModal = true" text-0.8rem>
        Create New Question
      </ui-button>
    </div>

    <AdminQuestionsList />

    <UiModal v-model="showModal" title="Create Question">
      <FormKit type="form" @submit="handleQuestionQuestion">
        <FormKit
          type="text"
          name="body"
          label="Question Body"
          placeholder="Enter the question body here"
          validation="required"
        />
      </FormKit>
    </UiModal>
  </Page>
</template>
