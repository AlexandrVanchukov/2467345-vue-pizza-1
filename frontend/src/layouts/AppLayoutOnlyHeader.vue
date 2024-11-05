<template>
  <div class="main-layout">
    <app-layout-header />
    <slot />
  </div>
</template>

<script setup>
import AppLayoutHeader from "./AppHeader.vue";
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
</style>
