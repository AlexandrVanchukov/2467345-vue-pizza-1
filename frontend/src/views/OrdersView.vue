<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>
    <section
      v-for="order in profileStore.getOrders"
      :key="order.id"
      class="sheet order"
    >
      <div class="order__wrapper">
        <div class="order__number">
          <b>Заказ #{{ order.id }}</b>
        </div>
        <div class="order__sum">
          <span>Сумма заказа: {{ totalOrderPrice(order) }} ₽</span>
        </div>
        <div class="order__button">
          <button
            type="button"
            class="button button--border"
            @click="profileStore.deleteOrder(order.id)"
          >
            Удалить
          </button>
        </div>
        <div class="order__button">
          <button type="button" class="button" @click="repeatOrder(order)">
            Повторить
          </button>
        </div>
      </div>
      <ul class="order__list">
        <li
          v-for="pizza in order.orderPizzas"
          :key="pizza.id"
          class="order__item"
        >
          <div class="product">
            <img
              src="../assets/img/product.svg"
              class="product__img"
              :width="IMG_SIZE"
              :height="IMG_SIZE"
              :alt="pizza.name"
            />
            <div class="product__text">
              <h2>{{ pizza.name }}</h2>
              <ul>
                <li>
                  {{ findNameById(dataStore.sizes, pizza.sizeId) }},
                  {{ idDoughToPhrase[pizza.doughId] || "на необычном тесте" }}
                </li>
                <li>
                  Соус:
                  {{
                    findNameById(dataStore.sauce, pizza.sauceId).toLowerCase()
                  }}
                </li>
                <li>Начинка: {{ getIngredientNames(pizza.ingredients) }}</li>
              </ul>
            </div>
          </div>
          <p class="order__price">
            <span v-if="pizza.quantity > 1">{{ pizza.quantity }}х</span
            >{{ pizzaPrice(pizza) }} ₽
          </p>
        </li>
      </ul>
      <ul class="order__additional">
        <li v-for="additioal in order.orderMisc" :key="additioal.id">
          <img
            :src="
              getPublicImage(
                getItemByIdOrDefault(dataStore.misc, additioal.miscId).image
              ) + '.svg'
            "
            width="20"
            height="30"
            :alt="getItemByIdOrDefault(dataStore.misc, additioal.miscId).name"
          />
          <p>
            <span>{{
              getItemByIdOrDefault(dataStore.misc, additioal.miscId).name
            }}</span>
            <b
              >{{
                getItemByIdOrDefault(dataStore.misc, additioal.miscId).price
              }}
              ₽</b
            >
          </p>
        </li>
      </ul>
      <p v-if="order.orderAddress" class="order__address">
        Адрес доставки: {{ order.orderAddress.name }}
        {{ order.orderAddress.street }}, д. {{ order.orderAddress.building }}
        <span v-if="order.orderAddress.flat"
          >, кв. {{ order.orderAddress.flat }}</span
        >
      </p>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import {
  useDataStore,
  useProfileStore,
  useCartStore,
  usePizzaStore,
} from "../stores";
import { pizzaPrice, getItemByIdOrDefault, findNameById } from "../helpers";
import { IMG_SIZE } from "../common/constants";
import { idDoughToPhrase } from "../common/constants";
import { getPublicImage } from "../common/helpers";

const router = useRouter();
const dataStore = useDataStore();
const profileStore = useProfileStore();
const cartStore = useCartStore();
const pizzaStore = usePizzaStore();

const repeatOrder = ({ orderPizzas, orderMisc, orderAddress }) => {
  cartStore.setDefaultState();
  pizzaStore.setDefault();

  for (const pizza of orderPizzas) {
    cartStore.savePizza(
      {
        index: null,
        name: pizza.name,
        sauceId: pizza.sauceId,
        doughId: pizza.doughId,
        sizeId: pizza.sizeId,
        ingredients: JSON.parse(JSON.stringify(pizza.ingredients)),
      },
      pizza.quantity
    );
  }
  for (const misc of orderMisc) {
    cartStore.setMiscQuantity(misc.miscId, misc.quantity);
  }
  cartStore.setAddress(orderAddress);

  router.push({ name: "cart" });
};

const totalOrderPrice = (order) => {
  const pizzasPrice = order.orderPizzas.reduce(
    (sum, pizza) => sum + pizzaPrice(pizza) * pizza.quantity,
    0
  );
  let miscPrice = 0;
  if (order.orderMisc) {
    miscPrice = order.orderMisc.reduce(
      (sum, m) =>
        sum + getItemByIdOrDefault(useDataStore().misc, m.miscId).price,
      0
    );
  }

  return pizzasPrice + miscPrice;
};

const getIngredientNames = (ingredients) => {
  const ingredientsNames = ingredients.map((i) =>
    findNameById(dataStore.ingredients, i.ingredientId)
  );
  return ingredientsNames.join(", ").toLowerCase();
};

profileStore.fetchOrders();
dataStore.fetchMisc();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  b {
    @include b-s14-h16;
  }

  span {
    @include b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}

.order__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}

.order__price {
  @include b-s16-h19;

  margin: 0;

  white-space: nowrap;
}

.order__additional {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;

  li {
    @include b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}

.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
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
.layout__sidebar {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;

  width: 180px;
  height: 100%;

  background-color: rgba($green-500, 0.05);
}

.layout__logo {
  display: block;

  margin-bottom: 30px;
  padding-top: 10px;
  padding-bottom: 10px;

  background-color: $green-500;

  img {
    display: block;

    margin: 0 auto;
  }
}

.layout__link {
  @include b-s14-h16;

  display: block;

  padding: 8px 14px;

  transition: 0.3s;

  color: $black;

  &--active {
    background-color: rgba($green-500, 0.1);
  }

  &:hover {
    background-color: rgba($green-500, 0.2);
  }

  &:active {
    color: rgba($black, 0.5);
  }
}

.layout__content {
  padding-top: 22px;
  padding-right: 2.12%;
  padding-left: 200px;
}

.layout__title {
  margin-bottom: 27px;
}

.layout__button {
  margin-top: 40px;

  button {
    padding: 12px 23px;
  }
}

.layout__address {
  margin-top: 16px;
}
</style>
