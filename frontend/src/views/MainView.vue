<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <ContentDough />

        <ContentDiameter />

        <ContentIngredients />

        <ContentPizza />
      </div>
    </form>
  </main>
</template>

<script setup>
import ContentDough from "../modules/constructor/ContentDough.vue";
import ContentDiameter from "../modules/constructor/ContentDiameter.vue";
import ContentIngredients from "../modules/constructor/ContentIngredients.vue";
import ContentPizza from "../modules/constructor/ContentPizza.vue";
</script>

<style lang="scss" scoped>
//Все стили были добавлены на этапе module2-task2
@import "@/assets/scss/app.scss";
// content
.content {
  padding-top: 20px;
}
.content__wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 920px;
  margin: 0 auto;
  padding-right: 2.12%;
  padding-bottom: 30px;
  padding-left: 2.12%;
}
</style>
