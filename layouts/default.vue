<template>
  <div class="w-full h-screen">
    <div class="auto-container h-full">
      <ReviewHeader />

      <div class="py-10">
        <slot />
      </div>

      <Dialogs />
      <Alerts />
    </div>
  </div>
</template>
