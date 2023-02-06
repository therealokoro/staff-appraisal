<script lang="ts" setup>
  import type { IUser } from "~~/types/auth"
  const props = defineProps<{ user: IUser }>()
  const isStudent = computed(() => props.user.role == "STUDENT")
</script>

<template>
  <div class="text-center space-y-1" v-if="user">
    <h1 class="font-extrabold text-lg md:text-xl">
      <span>Welcome, </span>
      <span>{{ user.profile.surname }} {{ user.profile.firstname }}</span>
    </h1>
    <div class="lt-md:text-0.9rem font-semibold c-content-100">
      <p v-if="user.profile.email">{{ user.profile.email }}</p>
      <p v-if="isStudent">Admission No.: {{ user.profile.admissionNo }}</p>
      <p v-if="isStudent">Level: {{ user.profile.level }} Level</p>
    </div>
    <div class="flex-center">
      <AChip variant="fill" color="success" v-if="isStudent">Student</AChip>
      <AChip variant="fill" color="info" v-else>Administrator</AChip>
    </div>
  </div>
</template>
