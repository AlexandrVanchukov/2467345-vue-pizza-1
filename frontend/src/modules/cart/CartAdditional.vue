<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        v-for="item in useDataStore().misc"
        :key="item.id"
        class="additional-list__item sheet"
      >
        <p class="additional-list__description">
          <img
            :src="getPublicImage(item.image) + '.svg'"
            width="39"
            height="60"
            :alt="item.name"
          />
          <span>{{ item.name }}</span>
        </p>
        <div class="additional-list__wrapper">
          <AppCounter
            v-model="miscQuantities[item.id]"
            :min="0"
            :max="10"
            class="counter additional-list__counter"
            @update:model-value="
              (newValue) => cartStore.setMiscQuantity(item.id, newValue)
            "
          />

          <div class="additional-list__price">
            <b>× {{ item.price }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { getPublicImage } from "../../common/helpers";
import AppCounter from "@/common/components/AppCounter.vue";
import { useCartStore } from "../../stores";
import { useDataStore } from "../../stores";
const cartStore = useCartStore();
const dataStore = useDataStore();

const miscQuantities = computed({
  get() {
    return dataStore.misc.reduce((acc, item) => {
      const miscItem = cartStore.misc.find((misc) => misc.miscId === item.id);
      acc[item.id] = miscItem ? miscItem.quantity : 0;
      return acc;
    }, {});
  },
  set(newValues) {
    for (const id in newValues) {
      const quantity = newValues[id];
      cartStore.setMiscQuantity(Number(id), quantity);
    }
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.container {
  width: 770px;
  margin: 0 auto;
}

.layout-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.cart__title {
  margin-bottom: 15px;
}

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.additional-list {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;
}

.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  img {
    margin-right: 10px;
    margin-left: 15px;
  }

  span {
    @include b-s14-h16;

    display: inline;

    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba($green-500, 0.1);
}
.additional-list__counter {
  width: 54px;
  margin-right: auto;
}

.additional-list__price {
  @include b-s16-h19;
}
</style>
