<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>
    <template v-for="sauce in useDataStore().sauce" :key="sauce.id">
      <label
        class="radio ingredients__input"
        @click="pizzaStore.setSauce(sauce.id)"
      >
        <input
          type="radio"
          name="sauce"
          :value="sauce.name_eng"
          :checked="pizzaStore.sauceId === sauce.id"
        />
        <span>{{ sauce.name }}</span>
      </label>
    </template>
  </div>
</template>

<script setup>
import { useDataStore } from "../../stores";
import { usePizzaStore } from "../../stores";

const pizzaStore = usePizzaStore();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
// radio
.radio {
  cursor: pointer;
  span {
    @include r-s16-h19;
    position: relative;
    padding-left: 28px;
    &:before {
      @include p_center-v;
      display: block;
      box-sizing: border-box;
      width: 20px;
      height: 20px;
      content: "";
      transition: 0.3s;
      border: 1px solid $purple-400;
      border-radius: 50%;
      background-color: $white;
    }
  }
  &:hover {
    input:not(:checked):not(:disabled) + span {
      &:before {
        border-color: $purple-800;
      }
    }
  }
  input {
    display: none;
    &:checked + span {
      &:before {
        border: 6px solid $green-500;
      }
    }
    &:disabled {
      & + span {
        &:before {
          border-color: $purple-400;
          background-color: $silver-200;
        }
      }
      &:checked + span {
        &:before {
          border: 6px solid $purple-400;
        }
      }
    }
  }
}
//ingredients
.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 14px;
  p {
    @include r-s16-h19;
    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}
.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}
</style>
