<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <ContentDough :dough='dough' @setDough='setDough' />

        <ContentDiameter :diameter='diameter' @setDiameter='setDiameter' />

        <ContentIngredients :sauce='sauce' :setSauce='setSauce' :fillings='fillings' @setFillings='setFillings' @drop='moveFilling'/>

        <ContentPizza :pizzaState='pizzaState' :dough='dough' :sauce='sauce' :fillings='fillings' :moveFilling='moveFilling'/>
      </div>
    </form>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import ContentDough from '../modules/constructor/ContentDough.vue';
import ContentDiameter from '../modules/constructor/ContentDiameter.vue';
import ContentIngredients from '../modules/constructor/ContentIngredients.vue';
import ContentPizza from '../modules/constructor/ContentPizza.vue';

const dough = ref('small');
const setDough = (value) => {
    dough.value = value
  }

const diameter = ref('small');
const setDiameter = (value) => {
    diameter.value = value
  }

const sauce = ref('tomato');
const setSauce = (value) => {
    sauce.value = value
  }

const fillings = ref({
    bacon: 1,
    ham: 1,
    cheddar: 1,
  });
const setFillings = (value) => {
    fillings.value = value
  }

  function moveFilling(fillingName){
    console.log('moveFilling');
    if(fillings.hasOwnProperty(fillingName)){
        const fillingNewValue = fillings[fillingName] + 1;
        fillings.value = {...fillings.value, [fillingName]: fillingNewValue};
    }
    else{
        fillings.value = {...fillings.value, [fillingName]: 1};
    }
}

const pizzaState = reactive({
  name: '',
  dough: 'small',
  diameter: 'big',
  sauce: 'tomato',
  fillings: {
    bacon: 1,
    ham: 1,
    cheddar: 1,
  }
});

</script>

<style lang="scss" scoped>
//Все стили были добавлены на этапе module2-task2 
@import "@/assets/scss/app.scss";
// input
.input {
  display: block;
  span {
    @include r-s14-h16;
    display: block;
    margin-bottom: 4px;
  }
  input {
    @include r-s16-h19;
    display: block;
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;
    transition: 0.3s;
    color: $black;
    border: 1px solid $purple-400;
    border-radius: 8px;
    outline: none;
    background-color: $white;
    font-family: inherit;
    &:focus {
      border-color: $green-500;
    }
  }
  &:hover {
    input {
      border-color: $black;
    }
  }
  &--big-label {
    display: flex;
    align-items: center;
    span {
      @include b-s16-h19;
      margin-right: 16px;
      white-space: nowrap;
    }
  }
}
// title
.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  color: $black;
  &--big {
    @include b-s36-h42;
  }
  &--small {
    @include b-s18-h21;
  }
}
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

// sheet
.sheet {
  padding-top: 15px;
  border-radius: 8px;
  background-color: $white;
  box-shadow: $shadow-light;
}
.sheet__title {
  padding-right: 18px;
  padding-left: 18px;
}
.sheet__content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 8px;
  padding-top: 18px;
  padding-right: 18px;
  padding-left: 18px;
  border-top: 1px solid rgba($green-500, 0.1);
}

</style>
