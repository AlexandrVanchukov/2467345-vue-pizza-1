<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select name="test" class="select" @change="handleSelectChange">
          <option value="-1">Заберу сам</option>
          <option value="0">Новый адрес</option>
          <option
            v-for="address in useProfileStore().getAddresses"
            :key="address.id"
            :value="address.id"
          >
            {{ address.id }}
          </option>
        </select>
      </label>
      <!-- :value="pizzaStore.name"
      @input="nameUpdate($event.target.value)" 
      
      function nameUpdate(newName) {
        pizzaStore.setName(newName);
        }
      
      -->
      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="tel"
          name="tel"
          placeholder="+7 999-999-99-99"
          :value="cartStore.getPhone"
          @input="inputUpdate(cartStore.setPhone, $event.target.value)"
        />
      </label>
      <template v-if="!isTakeOut">
        <div class="cart-form__address">
          <span class="cart-form__label">Новый адрес:</span>

          <div class="cart-form__input">
            <label class="input">
              <span>Улица*</span>
              <input
                type="text"
                name="street"
                :value="cartStore.getAddress.street"
                :readonly="isReadOnlyAddress"
                @input="inputUpdate(cartStore.setStreet, $event.target.value)"
              />
            </label>
          </div>

          <div class="cart-form__input cart-form__input--small">
            <label class="input">
              <span>Дом*</span>
              <input
                type="text"
                name="house"
                :value="cartStore.getAddress.building"
                :readonly="isReadOnlyAddress"
                @input="inputUpdate(cartStore.setBuilding, $event.target.value)"
              />
            </label>
          </div>

          <div class="cart-form__input cart-form__input--small">
            <label class="input">
              <span>Квартира</span>
              <input
                type="number"
                name="apartment"
                :value="cartStore.getAddress.flat"
                :readonly="isReadOnlyAddress"
                @input="inputUpdate(cartStore.setFlat, $event.target.value)"
              />
            </label>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useCartStore, useProfileStore } from "../../stores";
import { ref } from "vue";
const isTakeOut = ref(true);
const isReadOnlyAddress = ref(false);

const cartStore = useCartStore();

function inputUpdate(setFunction, newValue) {
  setFunction(newValue);
}
const findAddressById = (id) => {
  return useProfileStore().getAddresses.find((i) => i.id == id);
};

const handleSelectChange = (event) => {
  const selectedValue = event.target.value;
  cartStore.setReceivingOrderType(selectedValue);
  if (selectedValue > 0) {
    const currentAddress = findAddressById(selectedValue);
    isTakeOut.value = false;
    isReadOnlyAddress.value = true;

    cartStore.setPhone(useProfileStore().getPhone);
    cartStore.setStreet(currentAddress.street);
    cartStore.setBuilding(currentAddress.building);
    cartStore.setFlat(currentAddress.flat);
  } else if (selectedValue == 0) {
    isTakeOut.value = false;
    isReadOnlyAddress.value = false;
    cartStore.setStreet("");
    cartStore.setBuilding("");
    cartStore.setFlat("");
  } else {
    isTakeOut.value = true;
    isReadOnlyAddress.value = false;
    cartStore.setStreet("");
    cartStore.setBuilding("");
    cartStore.setFlat("");
  }
};
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

.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__select {
  display: flex;
  align-items: center;

  margin-right: auto;

  span {
    margin-right: 16px;
  }
}

.cart-form__label {
  @include b-s16-h19;

  white-space: nowrap;
}

.cart-form__address {
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;

  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
  }
}

.select {
  @include r-s16-h19;

  display: block;

  margin: 0;
  padding: 8px 16px;
  padding-right: 30px;

  cursor: pointer;
  transition: 0.3s;

  color: $black;
  border: 1px solid $purple-400;
  border-radius: 8px;
  outline: none;
  background-color: $silver-100;
  background-image: url("@/assets/img/select.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;

  font-family: inherit;

  appearance: none;

  &:hover {
    border-color: $orange-100;
  }

  &:focus {
    border-color: $green-500;
  }
}

.button--arrow::before {
  content: "";
  background-image: url("@/assets/img/button-arrow.svg");
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 16px;
  width: 18px;
  height: 18px;
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: translateY(-1px);
}
</style>
