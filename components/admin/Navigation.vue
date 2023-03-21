<script lang="ts" setup>
  const navLinks = [
    { label: "Home", link: "/admin" },
    { label: "Reviews", link: "/admin/reviews" },
    { label: "Courses", link: "/admin/courses" },
    { label: "Lecturers", link: "/admin/lecturers" },
    { label: "Questions", link: "/admin/questions" }
  ]

  async function handleSignOut() {
    const { signOut } = useAuth()
    await signOut()
    return navigateTo("/")
  }
</script>

<template>
  <nav class="w-auto">
    <ul class="flex items-center gap-5 text-0.85rem font-bold">
      <li v-for="item in navLinks">
        <nuxt-link class="hover:c-accent-200" :to="item.link">
          {{ item.label }}
        </nuxt-link>
      </li>
      <li>
        <button @click="handleSignOut()" class="hover:c-accent-200">
          Log out
        </button>
      </li>
    </ul>
  </nav>
</template>

<style>
  .router-link-active,
  .router-link-active-exact {
    --at-apply: "c-accent-200";
  }
</style>
