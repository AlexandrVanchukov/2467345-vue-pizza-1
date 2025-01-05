<template>
  <ul class="cart-list sheet">
    <li
      v-for="item in cartStore.getPizzas"
      :key="item.id"
      class="cart-list__item"
    >
      <div class="product cart-list__product">
        <img
          src="../../assets/img/product.svg"
          class="product__img"
          :width="IMG_SIZE"
          :height="IMG_SIZE"
          :alt="item.name"
        />
        <div class="product__text">
          <h2>{{ item.name }}</h2>
          <ul>
            <li>
              {{ findNameById(dataStore.sizes, item.sizeId) }},
              {{ idDoughToPhrase[item.doughId] || "на необычном тесте" }}
            </li>
            <li>
              Соус:
              {{ findNameById(dataStore.sauce, item.sauceId).toLowerCase() }}
            </li>
            <li>Начинка: {{ getIngredientNames(item.ingredients) }}</li>
          </ul>
        </div>
      </div>

      <AppCounter
        v-model="item.quantity"
        :min="0"
        :max="10"
        @update:model-value="
          (newValue) => cartStore.setPizzaQuantity(item.index, newValue)
        "
      />

      <div class="cart-list__price">
        <b>{{ pizzaPrice(item) * item.quantity }} ₽</b>
      </div>

      <div class="cart-list__button">
        <router-link
          :to="{ name: 'home' }"
          class="cart-list__edit"
          @click="editItem(item)"
        >
          Изменить
        </router-link>
      </div>
    </li>
  </ul>
</template>

<script setup>
import AppCounter from "@/common/components/AppCounter.vue";
import { useCartStore } from "../../stores";
import { useDataStore } from "../../stores";
import { usePizzaStore } from "../../stores";
import { pizzaPrice } from "../../helpers";
import { findNameById } from "../../helpers";
import { idDoughToPhrase } from "../../common/constants";
import { IMG_SIZE } from "../../common/constants";

const cartStore = useCartStore();
const dataStore = useDataStore();
const pizzaStore = usePizzaStore();

const getIngredientNames = (ingredients) => {
  const ingredientsNames = ingredients.map((i) =>
    findNameById(dataStore.ingredients, i.ingredientId)
  );
  return ingredientsNames.join(", ").toLowerCase();
};
const editItem = (pizza) => {
  pizzaStore.loadPizza(pizza);
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/app.scss";

.container {
  width: 770px;
  margin: 0 auto;
}
.cart-list {
  @include clear-list;

  padding: 15px 0;
}

.cart-list__item {
  display: flex;
  align-items: flex-start;

  margin-bottom: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;

    border-bottom: none;
  }
}

.cart-list__product {
  flex-grow: 1;

  margin-right: auto;
}

.cart-list__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}

.cart-list__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;

  text-align: right;

  b {
    @include b-s16-h19;
  }
}

.cart-list__edit {
  @include l-s11-h13;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  outline: none;
  background-color: transparent;

  &:hover {
    color: $green-500;
  }

  &:active {
    color: $green-600;
  }

  &:focus {
    color: $green-400;
  }
}

.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include clear-list;
    @include l-s11-h13;
  }
}
</style>
