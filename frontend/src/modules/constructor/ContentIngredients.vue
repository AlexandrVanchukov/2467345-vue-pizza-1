<template>
    <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <IngredientsSauce :sauce='sauce' @setSauce='setSauce'/>

              <div class="ingredients__filling">
                <p>Начинка:</p>
                <ul class="ingredients__list">
                    <li class="ingredients__item" v-for="ingredient in ingredients"
                    :key="ingredient.id">
                        <app-drag :transfer-data="ingredient.name_eng">
                            <span
                                class="filling"
                                :class="getFillingStyle(ingredient.name_eng)"
                                >{{ ingredient.name }}
                            </span>
                        </app-drag>
                        <div class="counter counter--orange ingredients__counter">
                            <button
                                type="button"
                                class="counter__button counter__button--minus"
                                :disabled='isDisabledMinus(ingredient.name_eng)'
                                @click='minusHandler(ingredient.name_eng)'
                            >
                                <span class="visually-hidden">Меньше</span>
                            </button>
                            <input
                                type="text"
                                name="counter"
                                class="counter__input"
                                :value="getFillingValue(ingredient.name_eng)"
                            />
                            <button
                                type="button"
                                class="counter__button counter__button--plus"
                                @click='plusHandler(ingredient.name_eng)'
                            >
                                <span class="visually-hidden">Больше</span>
                            </button>
                        </div>
                    </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
</template>

<script setup>
import ingredients from "../../mocks/ingredients.json";
import IngredientsSauce from './IngredientsSauce.vue';
import AppDrag from '../../common/components/AppDrag.vue';
const props = defineProps({
  sauce: {
    type: String,
    required: true,
    default: 'tomato',
  },
  setSauce: {
    type: Function,
    required: true,
  },
  fillings:{
    type: Object,
    required: true,
  }
})
console.log(props.fillings);
const emit = defineEmits(["setFillings","drop"]);

function getFillingStyle(ingredient_name) {
  return `filling--${ingredient_name}`;
}

function getFillingValue(fillingName){
    if(props.fillings.hasOwnProperty(fillingName)){
        return props.fillings[fillingName];
    }
    else{
        return '0';
    }
    
}

function isDisabledMinus(fillingName){
    return !props.fillings.hasOwnProperty(fillingName)
}

function minusHandler(fillingName){
    const fillingNewValue = props.fillings[fillingName] - 1;
    if(fillingNewValue > 0){
        emit('setFillings', {...props.fillings, [fillingName]: fillingNewValue})
    }
    else{
        const { [fillingName]: _, ...newObj } = props.fillings;
        emit('setFillings', newObj)
    }
}

function plusHandler(fillingName){
    if(props.fillings.hasOwnProperty(fillingName)){
        const fillingNewValue = props.fillings[fillingName] + 1;
        emit('setFillings', {...props.fillings, [fillingName]: fillingNewValue})
    }
    else{
        const { [fillingName]: _, ...newObj } = props.fillings;
        emit('setFillings', {...props.fillings, [fillingName]: 1})
    }
}



</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
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
.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
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
// ingredients
.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}
.ingredients__filling {
  width: 100%;
  p {
    @include r-s16-h19;
    margin-top: 0;
    margin-bottom: 16px;
  }
}
.ingredients__list {
  @include clear-list;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}
.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
// counter
.counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.counter__button {
  $el: &;
  $size_icon: 50%;
  position: relative;
  display: block;
  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition: 0.3s;
  border: none;
  border-radius: 50%;
  outline: none;
  &--minus {
    background-color: $purple-100;
    &::before {
      @include p_center-all;
      width: $size_icon;
      height: 2px;
      content: "";
      border-radius: 2px;
      background-color: $black;
    }
    &:hover:not(:active):not(:disabled) {
      background-color: $purple-200;
    }
    &:active:not(:disabled) {
      background-color: $purple-300;
    }
    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }
    &:disabled {
      cursor: default;
      &::before {
        opacity: 0.1;
      }
    }
  }
  &--plus {
    background-color: $green-500;
    &::before {
      @include p_center-all;
      width: $size_icon;
      height: 2px;
      content: "";
      border-radius: 2px;
      background-color: $white;
    }
    &::after {
      @include p_center-all;
      width: $size_icon;
      height: 2px;
      content: "";
      transform: translate(-50%, -50%) rotate(90deg);
      border-radius: 2px;
      background-color: $white;
    }
    &:hover:not(:active):not(:disabled) {
      background-color: $green-400;
    }
    &:active:not(:disabled) {
      background-color: $green-600;
    }
    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }
    &:disabled {
      cursor: default;
      opacity: 0.3;
    }
  }
  &--orange {
    background-color: $orange-200;
    &:hover:not(:active):not(:disabled) {
      background-color: $orange-100;
    }
    &:active:not(:disabled) {
      background-color: $orange-300;
    }
  }
}
.counter__input {
  @include r-s14-h16;
  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0 3px;
  text-align: center;
  color: $black;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: transparent;
  &:focus {
    box-shadow: inset $shadow-regular;
  }
}
// visually-hidden
.visually-hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  white-space: nowrap;
  border: 0;
  clip-path: inset(100%);
}
// filling
.filling {
  @include r-s14-h16;
  position: relative;
  display: block;
  padding-left: 36px;
  &::before {
    @include p_center-v;
    display: block;
    width: 32px;
    height: 32px;
    content: "";
    border-radius: 50%;
    background-color: $white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;
  }
  &--tomatoes::before {
    background-image: url("@/assets/img/filling/tomatoes.svg");
  }
  &--ananas::before {
    background-image: url("@/assets/img/filling/ananas.svg");
  }
  &--bacon::before {
    background-image: url("@/assets/img/filling/bacon.svg");
  }
  &--blue_cheese::before {
    background-image: url("@/assets/img/filling/blue_cheese.svg");
  }
  &--cheddar::before {
    background-image: url("@/assets/img/filling/cheddar.svg");
  }
  &--chile::before {
    background-image: url("@/assets/img/filling/chile.svg");
  }
  &--ham::before {
    background-image: url("@/assets/img/filling/ham.svg");
  }
  &--jalapeno::before {
    background-image: url("@/assets/img/filling/jalapeno.svg");
  }
  &--mozzarella::before {
    background-image: url("@/assets/img/filling/mozzarella.svg");
  }
  &--mushrooms::before {
    background-image: url("@/assets/img/filling/mushrooms.svg");
  }
  &--olives::before {
    background-image: url("@/assets/img/filling/olives.svg");
  }
  &--onion::before {
    background-image: url("@/assets/img/filling/onion.svg");
  }
  &--parmesan::before {
    background-image: url("@/assets/img/filling/parmesan.svg");
  }
  &--salami::before {
    background-image: url("@/assets/img/filling/salami.svg");
  }
  &--salmon::before {
    background-image: url("@/assets/img/filling/salmon.svg");
  }
}
</style>