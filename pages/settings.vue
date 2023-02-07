<script lang="ts" setup>
  const { EditAccountSchema, ChangePasswordSchema } = useFormSchemas()

  const user = getAuthUser()
  const userInfo = computed(() => user!.profile)
  const { callRefreshAuth } = useAuth()

  async function editAccountInfo(data: any) {
    try {
      const res = await useApi.put(`/profile/update?id=${user?.id}`, data)
      if (res.error) throw new Error(res.message)
      Alerts.success("Account info updated successfully")
      await callRefreshAuth()
    } catch (e: any) {
      Alerts.error(e.message)
    }
  }

  async function changeAccPassword(data: any) {
    try {
      const res = await useApi.put(`/profile/password?id=${user?.id}`, data)
      if (res.error) throw new Error(res.message)
      Alerts.success("Account password updated successfully")
    } catch (e: any) {
      Alerts.error(e.message)
    }
  }
</script>

<template>
  <Page title="Settings" spacing>
    <div class="space-y-2">
      <h1 class="font-bold text-lg">Account Settings</h1>
      <p class="text-0.8rem font-medium c-content-100">
        Change your account password, name and others
      </p>
    </div>

    <div grid="~ lg:cols-2 gap-4">
      <FormKit type="form" @submit="editAccountInfo" :value="userInfo">
        <div class="space-y-6 p-7 bg-gray-100">
          <h1 class="text-0.8rem font-bold">Change Account Info</h1>
          <FormKitSchema :schema="EditAccountSchema" />
        </div>
      </FormKit>

      <FormKit type="form" @submit="changeAccPassword">
        <div class="space-y-6 p-7 bg-gray-100">
          <h1 class="text-0.8rem font-bold">Change Account Password</h1>
          <FormKitSchema :schema="ChangePasswordSchema" />
        </div>
      </FormKit>
    </div>
  </Page>
</template>
