<script setup lang="ts">
  import {
    TransitionChild,
    TransitionRoot,
    Dialog,
    DialogTitle,
    DialogPanel
  } from "@headlessui/vue"
  const props = defineProps<{
    title?: string
    modelValue: boolean
    width?: string
    bodyClass?: string
  }>()

  const emit = defineEmits(["update:modelValue"])
  const isOpen = useVModel(props, "modelValue", emit)

  const closeModal = () => (isOpen.value = false)
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="transform overflow-hidden rounded-lg bg-base-100 shadow-xl transition-all lt-sm:w-full px-6 py-5 space-y-5"
              :class="width ? width : 'w-md'"
            >
              <!-- Modal Header -->
              <div
                v-if="title"
                class="w-full flex items-center justify-between"
              >
                <!-- Modal Title -->
                <DialogTitle as="h3" class="font-bold">
                  {{ title }}
                </DialogTitle>

                <!-- Modal Close Button -->
                <ui-icon
                  class="text-xs p-1!"
                  @click="closeModal"
                  icon="i-tabler-x"
                />
              </div>

              <!-- Modal Content -->
              <div class="text-0.75rem" :class="bodyClass">
                <slot />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
