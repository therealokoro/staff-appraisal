<script setup lang="ts">
  const { dialog } = useDialogs()
  const colorMap = computed(() => {
    switch (dialog.value?.style) {
      case "danger":
        return "text-red-500"
      case "success":
        return "text-green-500"
      case "warning":
        return "text-orange-500"
      default:
        return "text-accent-200"
    }
  })
</script>

<template>
  <UiModal v-if="dialog" v-model="dialog.isShowing" :title="dialog.title">
    <div class="flex flex-col gap-3 items-center">
      <ui-icon
        as="span"
        plain
        :class="['text-xl', colorMap]"
        icon="i-mingcute-information-line"
      />
      <div class="text-center">
        <div v-if="dialog.html" v-html="dialog.message" />
        <div v-else class="heading-small">{{ dialog.message }}</div>
      </div>

      <!-- Action buttons -->
      <div class="flex gap-2">
        <!-- Confirm Button -->
        <ui-button @click="dialog?.confirm">
          {{ dialog.confirmText }}
        </ui-button>

        <!-- Cancel Button -->
        <ui-button variant="text" @click="dialog?.cancel">
          {{ dialog.cancelText }}
        </ui-button>
      </div>
    </div>
  </UiModal>
</template>
