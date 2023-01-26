<script lang="ts" setup>
  definePageMeta({ layout: "global" })

  const { LoginSchema, RegisterSchema } = useFormSchemas()
  const { createNewUser } = useAuthStore()
  const { signIn } = useAuth()

  // store form type
  const formTypes = ["LOGIN", "REGISTER"]
  const formType = ref<"LOGIN" | "REGISTER">("LOGIN")

  // compute form messages
  const formMsgs = computed(() => {
    return formType.value == "LOGIN"
      ? { main: "LOGIN", sub: "Enter your account info below to login" }
      : { main: "REGISTER", sub: "Fill the form below to register" }
  })

  async function handleSubmit(data: any) {
    try {
      if (formType.value == "REGISTER") {
        await createNewUser(data)
        await navigateTo("/home")
      } else {
        const user = await signIn(data)
        const path = user?.role == "STUDENT" ? "/home" : "/admin"
        await navigateTo(path)
      }
    } catch (e: any) {
      Alerts.error(e)
    }
  }
</script>

<template>
  <Page title="Get Started">
    <div class="w-full h-screen flex-center">
      <div class="w-lg bg-base-100 shadow p-10">
        <!-- Form Tab -->
        <div class="w-full flex-center">
          <button
            v-for="btn in formTypes"
            class="text-sm p-3 font-bold border-2 border-accent-200"
            @click="formType = btn as any"
            :class="
              formType == btn
                ? 'bg-accent-200 c-white'
                : 'bg-transparent c-accent-200'
            "
          >
            {{ btn }}
          </button>
        </div>

        <!-- Form Heading -->
        <div class="space-y-2 text-center my-10">
          <h3 class="text-lg font-black">{{ formMsgs.main }}</h3>
          <p class="text-sm font-bold c-content-100">
            {{ formMsgs.sub }}
          </p>
        </div>

        <!-- Form -->
        <FormKit type="form" @submit="handleSubmit" submit-label="Continue">
          <div v-if="formType == 'LOGIN'" class="w-full" grid="~ cols-1 gap-5">
            <FormKitSchema :schema="LoginSchema" />
          </div>

          <div v-else class="w-full mt-10" grid="~ cols-2 gap-5">
            <FormKitSchema :schema="RegisterSchema" />
          </div>
        </FormKit>
      </div>
    </div>
  </Page>
</template>
