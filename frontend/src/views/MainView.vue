<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <ContentDough :dough="dough" @set-dough="setDough" />

        <ContentDiameter :diameter="diameter" @set-diameter="setDiameter" />

        <ContentIngredients
          :sauce="sauce"
          :set-sauce="setSauce"
          :fillings="fillings"
          @set-fillings="setFillings"
          @drop="moveFilling"
        />

        <ContentPizza
          :pizza-state="pizzaState"
          :dough="dough"
          :sauce="sauce"
          :fillings="fillings"
          :move-filling="moveFilling"
        />
      </div>
    </form>
  </main>
</template>

<script setup>
import { reactive, ref } from "vue";
import ContentDough from "../modules/constructor/ContentDough.vue";
import ContentDiameter from "../modules/constructor/ContentDiameter.vue";
import ContentIngredients from "../modules/constructor/ContentIngredients.vue";
import ContentPizza from "../modules/constructor/ContentPizza.vue";

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

const setFillings = (value) => {
  fillings.value = value;
};

function moveFilling(fillingName) {
  console.log("moveFilling");
  fillings.value[fillingName]++;
}

const pizzaState = reactive({
  name: "",
  dough: "small",
  diameter: "big",
  sauce: "tomato",
  fillings: {
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
  },
});
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
