<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <ContentDough
          :price="price"
          :dough="dough"
          @set-price="setPrice"
          @set-dough="setDough"
        />

        <ContentDiameter :diameter="diameter" @set-diameter="setDiameter" />

        <ContentIngredients
          :sauce="sauce"
          :set-sauce="setSauce"
          :fillings="fillings"
          :set-price="setPrice"
          @drop="moveFilling"
        />

        <ContentPizza
          :dough="dough"
          :sauce="sauce"
          :fillings="fillings"
          :move-filling="moveFilling"
          :price="price"
        />
      </div>
    </form>
  </main>
</template>

<script setup>
import { ref, watch } from "vue";
import ContentDough from "../modules/constructor/ContentDough.vue";
import ContentDiameter from "../modules/constructor/ContentDiameter.vue";
import ContentIngredients from "../modules/constructor/ContentIngredients.vue";
import ContentPizza from "../modules/constructor/ContentPizza.vue";
import { translateNameToRus } from "../helpers/translate-name";

import doughData from "../mocks/dough.json";
import ingredientsData from "../mocks/ingredients.json";
import saucesData from "../mocks/sauces.json";
import sizesData from "../mocks/sizes.json";

const dough = ref("light");
const setDough = (value) => {
  dough.value = value;
};

const diameter = ref("small");
const setDiameter = (value) => {
  diameter.value = value;
};

const sauce = ref("tomato");
const setSauce = (value) => {
  sauce.value = value;
};

const fillings = ref({
  bacon: 1,
  ham: 1,
  cheddar: 1,
  mushrooms: 0,
  salami: 0,
  ananas: 0,
  onion: 0,
  chile: 0,
  jalapeno: 0,
  olives: 0,
  tomatoes: 0,
  salmon: 0,
  mozzarella: 0,
  parmesan: 0,
  blue_cheese: 0,
});

watch(
  [fillings, dough, sauce, diameter],
  () => {
    setPrice();
  },
  { deep: true }
);

function moveFilling(fillingName) {
  fillings.value[fillingName]++;
}

const price = ref(0);
const setPrice = () => {
  price.value = totalPrice();
};

function totalPrice() {
  var result = 0;
  result += doughData.find(
    (d) => d.name == translateNameToRus(dough.value)
  ).price;

  for (const ingredient in fillings.value) {
    if (fillings.value[ingredient] > 0) {
      result +=
        ingredientsData.find((i) => i.name == translateNameToRus(ingredient))
          .price * fillings.value[ingredient];
    }
  }

  result += saucesData.find(
    (s) => s.name == translateNameToRus(sauce.value)
  ).price;

  result *= sizesData.find(
    (s) => s.id == translateNameToRus(diameter.value)
  ).multiplier;

  return result;
}
setPrice();
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
