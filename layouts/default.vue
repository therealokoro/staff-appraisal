<template>
  <div class="w-full h-screen">
    <div class="auto-container h-full">
      <ReviewHeader />

      <div class="py-10">
        <slot />
      </div>

      <AppDialogs />
      <AppAlerts />
    </div>
  </div>
</template>
