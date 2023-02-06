<template>
  <div class="w-full h-screen">
    <div class="auto-container h-full">
      <AdminHeader />

      <div class="py-10">
        <slot />
      </div>
    </div>

    <AppDialogs />
    <AppAlerts />
  </div>
</template>
