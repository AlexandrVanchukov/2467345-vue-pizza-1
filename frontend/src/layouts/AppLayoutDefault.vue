<template>
  <div class="main-layout">
    <app-header />
    <main class="layout">
      <app-sidebar />
      <slot />
    </main>
  </div>
</template>

<script setup>
import AppHeader from "./AppHeader.vue";
import AppSidebar from "./AppSidebar.vue";
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.main-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
