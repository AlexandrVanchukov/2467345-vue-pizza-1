<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <IngredientsSauce :sauce="sauce" @set-sauce="setSauce" />

        <div class="ingredients__filling">
          <p>Начинка:</p>
          <ul class="ingredients__list">
            <li
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              class="ingredients__item"
            >
              <app-drag :transfer-data="ingredient.name_eng">
                <span
                  class="filling"
                  :class="getFillingStyle(ingredient.name_eng)"
                  >{{ ingredient.name }}
                </span>
              </app-drag>
              <AppCounter v-model="fillings[ingredient.name_eng]" />
              <!-- <div class="counter counter--orange ingredients__counter">
                <button
                  type="button"
                  class="counter__button counter__button--minus"
                  :disabled="isDisabledMinus(ingredient.name_eng)"
                  @click="minusHandler(ingredient.name_eng)"
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
                  @click="plusHandler(ingredient.name_eng)"
                >
                  <span class="visually-hidden">Больше</span>
                </button>
              </div> -->
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import ingredients from "../../mocks/ingredients.json";
import IngredientsSauce from "./IngredientsSauce.vue";
import AppDrag from "../../common/components/AppDrag.vue";
import AppCounter from "@/common/components/AppCounter.vue";
const props = defineProps({
  sauce: {
    type: String,
    required: true,
    default: "tomato",
  },
  setSauce: {
    type: Function,
    required: true,
  },
  fillings: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["setFillings", "drop", "update:fillings"]);

const fillings = computed({
  get() {
    return props.fillings;
  },
  set(fillings) {
    emit("update:fillings", fillings);
  },
});
console.log(fillings);
console.log(fillings.value);
console.log(fillings.value["mushrooms"]);
function getFillingStyle(ingredient_name) {
  return `filling--${ingredient_name}`;
}

// function getFillingValue(fillingName) {
//   if (props.fillings.hasOwnProperty(fillingName)) {
//     return props.fillings[fillingName];
//   } else {
//     return "0";
//   }
// }
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
// ingredients
.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}
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
