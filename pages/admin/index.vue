<script lang="ts" setup>
  const user = getAuthUser()
  const currentSession = ref<string | null>("")

  const { data: sessions, refresh } = await useLazyAsyncData(async () => {
    const currSession = await $fetch("/api/sessions/current")
    currentSession.value = currSession?.data
    const res = await $fetch("/api/sessions")
    return res.data
  })

  const newSession = ref("")
  const showForm = ref(false)

  async function createNewSession() {
    try {
      const res = await useApi.post("sessions/create", {
        name: newSession.value
      })

      if (res.error) throw Error(res.message)

      await refresh()
      Alerts.success("New sessions created successfully")
    } catch (e: any) {
      console.log(e)
      Alerts.error(e.message)
    }
  }

  async function setActiveSession(id: string) {
    await $fetch(`/api/sessions/current?set=true&id=${id}`)
    currentSession.value = id
  }
</script>

<template>
  <Page title="Welcome">
    <div class="w-full flex-col-center gap-15" v-if="user">
      <WelcomeUser :user="user" />

      <div class="w-full flex-col-center gap-5">
        <div class="w-full text-center">
          <h3 class="text-lg font-bold">Set Current Session</h3>
          <p class="text-0.8rem font-semibold c-content-100 mt-2">
            This will automatically be set and seen by all students that make a
            review
          </p>
        </div>

        <div class="w-1/2 flex-center flex-wrap gap-3" v-if="sessions">
          <ui-button
            :variant="currentSession == session.id ? 'fill' : 'outline'"
            class="text-md"
            v-for="session in sessions"
            :key="session.id"
            @click="setActiveSession(session.id)"
          >
            {{ session.name }}
          </ui-button>
        </div>

        <ui-button @click="showForm = true" variant="text">
          Create New Session
        </ui-button>

        <div
          v-if="showForm"
          class="w-md bg-gray-200/60 p-10 rounded-lg border-2"
        >
          <FormKit type="form" @submit="createNewSession">
            <FormKit
              label="Session Title"
              placeholder="Enter the sessions title here"
              v-model="newSession"
              help="Example: 2023/2024"
            />
          </FormKit>
        </div>
      </div>
    </div>
  </Page>
</template>
