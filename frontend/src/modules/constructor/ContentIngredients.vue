<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <IngredientsSauce />

        <div class="ingredients__filling">
          <p>Начинка:</p>
          <ul class="ingredients__list">
            <li
              v-for="ingredient in useDataStore().ingredients"
              :key="ingredient.id"
              class="ingredients__item"
            >
              <app-drag
                :transfer-data="ingredient.id + ''"
                :is-dragable="isDragable(ingredient.id)"
              >
                <span
                  class="filling"
                  :class="getFillingStyle(ingredient.name_eng)"
                  >{{ ingredient.name }}
                </span>
              </app-drag>
              <AppCounter
                v-model="fillings[ingredient.name_eng]"
                :min="0"
                :max="3"
                @update:model-value="
                  (newValue) => handleUpdate(ingredient.name_eng, newValue)
                "
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import IngredientsSauce from "./IngredientsSauce.vue";
import AppDrag from "../../common/components/AppDrag.vue";
import AppCounter from "@/common/components/AppCounter.vue";
import { transformIngredients } from "../../helpers";
import { reverseTransformIngredients } from "../../helpers";

import { useDataStore } from "../../stores";
import { usePizzaStore } from "../../stores";

const pizzaStore = usePizzaStore();

console.log(useDataStore().ingredients);

const fillings = computed({
  get() {
    return transformIngredients(
      pizzaStore.ingredients,
      useDataStore().ingredients
    );
  },
});

const handleUpdate = (ingredientName, newValue) => {
  const newIngredients = { ...fillings, [ingredientName]: newValue };
  const result = reverseTransformIngredients(
    newIngredients._value,
    useDataStore().ingredients
  );
  pizzaStore.setIngredients(result);
};

function isDragable(ingredient_id) {
  const ingredient = pizzaStore.ingredients.find(
    (i) => i.ingredientId === ingredient_id
  );
  if (ingredient) {
    return ingredient.quantity > 2 ? false : true;
  } else {
    return true;
  }
}

function getFillingStyle(ingredient_name_eng) {
  return `filling--${ingredient_name_eng}`;
}
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
