<script lang="ts" setup>
  const navLinks = [
    { label: "Home", link: "/home" },
    // { label: "My Reviews", link: "/my-reviews" },
    { label: "Settings", link: "/settings" }
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
