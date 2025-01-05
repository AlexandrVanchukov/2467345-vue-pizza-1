<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <template v-for="size in useDataStore().sizes" :key="size.id">
          <label
            class="diameter__input"
            :class="`diameter__input--${getDiameterValue(size.name)}`"
            @click="pizzaStore.setSize(size.id)"
          >
            <input
              type="radio"
              name="diameter"
              :value="getDiameterValue(size.name)"
              class="visually-hidden"
              :checked="pizzaStore.sizeId === size.id"
            />
            <span>{{ size.name }}</span>
          </label>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDataStore, usePizzaStore } from "../../stores";
const pizzaStore = usePizzaStore();

function getDiameterValue(diameter) {
  let diameterValue = "";
  if (diameter === "23 см") {
    diameterValue = "small";
  } else if (diameter === "32 см") {
    diameterValue = "normal";
  } else {
    diameterValue = "big";
  }
  return diameterValue;
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
// diameter
.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;
  cursor: pointer;
  span {
    @include r-s16-h19;
    position: relative;
    padding-left: 46px;
    &::before {
      @include p_center_v;
      width: 36px;
      height: 36px;
      content: "";
      transition: 0.3s;
      border-radius: 50%;
      background-color: $green-100;
      background-image: url("@/assets/img/diameter.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  &:nth-child(3n) {
    margin-right: 0;
  }
  &--small {
    span::before {
      background-size: 18px;
    }
  }
  &--normal {
    span::before {
      background-size: 29px;
    }
  }
  &--big {
    span::before {
      background-size: 100%;
    }
  }
  &:hover {
    span::before {
      box-shadow: $shadow-regular;
    }
  }
  input {
    &:checked + span::before {
      box-shadow: $shadow-large;
    }
  }
}
.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
