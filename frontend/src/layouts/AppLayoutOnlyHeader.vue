<template>
  <div class="main-layout">
    <app-header />
    <slot />
  </div>
</template>

<script setup>
import AppHeader from "./AppHeader.vue";
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
</style>
