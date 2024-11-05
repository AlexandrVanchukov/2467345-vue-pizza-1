<template>
  <ul>
    <li>
      <RouterLink :to="{ name: 'Welcome' }">Страница приветствия</RouterLink>
    </li>
    <li><RouterLink :to="{ name: 'Main' }">Главная</RouterLink></li>
    <li><RouterLink :to="{ name: 'Cart' }">Корзина</RouterLink></li>
    <li><RouterLink :to="{ name: 'Orders' }">История заказов</RouterLink></li>
    <li>
      <RouterLink :to="{ name: 'Index' }">Попап "Спасибо за заказ"</RouterLink>
    </li>
    <li><RouterLink :to="{ name: 'SignIn' }">Авторизация</RouterLink></li>
    <li><RouterLink :to="{ name: 'UserData' }">Мои данные</RouterLink></li>
  </ul>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
</style>
