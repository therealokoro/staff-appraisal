<script setup lang="ts">
  import type { Alert } from "~~/composables/alerts"

  const alerts = computed(() => {
    const alertList = useState<Alert[]>("alerts")
    return alertList.value
  })

  const props = withDefaults(
    defineProps<{
      position?: "top" | "bottom"
    }>(),
    { position: "bottom" }
  )

  const positionClass = computed(() =>
    props.position == "top" ? "top-0" : "bottom-0"
  )
</script>

<template>
  <div
    :class="[
      'fixed h-max top-0 left-1/2 -translate-x-1/2 p-3 space-y-5 z-2',
      positionClass
    ]"
  >
    <TransitionGroup name="alerts">
      <div
        v-for="alert in alerts"
        :key="alert.id"
        :class="['alert', alert.style]"
      >
        <div class="flex items-center gap-3">
          <ui-icon
            :icon="
              alert.style == 'success'
                ? 'i-tabler-circle-check'
                : 'i-tabler-info-circle'
            "
            plain
            as="span"
          />
          <p class="text-0.89rem font-semibold">{{ alert.message }}</p>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">
  .alerts-enter-active,
  .alerts-leave-active {
    transition: all 0.3s ease;
  }
  .alerts-enter-from,
  .alerts-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .alert {
    --at-apply: "max-w-sm p-4 rounded-lg c-white flex justify-between";

    &.primary {
      --at-apply: "bg-accent-200";
    }

    &.info {
      --at-apply: "bg-blue-400";
    }

    &.success {
      --at-apply: "bg-green-400";
    }

    &.danger {
      --at-apply: "bg-red-400";
    }

    &.warning {
      --at-apply: "bg-orange-400";
    }
  }
</style>
