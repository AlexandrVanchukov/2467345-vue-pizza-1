<template>
  <form class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="cartStore.pizzas.length === 0" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <div v-else>
          <CartList />

          <CartAdditional />

          <CartForm />
        </div>
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <router-link
          :to="{ name: 'home' }"
          class="button button--border button--arrow"
          >Хочу еще одну
        </router-link>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ cartStore.totalCartPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button
          type="button"
          class="button"
          :disabled="isSubmitting || !cartStore.pizzas.length"
          @click="handleSubmit"
        >
          {{ isSubmitting ? "Отправка..." : "Оформить заказ" }}
        </button>
      </div>
      <SuccessPopup v-if="isPopupVisible" />
    </section>
  </form>
</template>

<script setup>
import { ref } from "vue";
import {
  useCartStore,
  useProfileStore,
  useDataStore,
  usePizzaStore,
} from "../stores";
import CartList from "../modules/cart/CartList.vue";
import CartAdditional from "../modules/cart/CartAdditional.vue";
import CartForm from "../modules/cart/CartForm.vue";
import SuccessPopup from "../modules/cart/SuccessPopup.vue";

const cartStore = useCartStore();
const dataStore = useDataStore();
const profileStore = useProfileStore();
const isPopupVisible = ref(false);
const isSubmitting = ref(false);

const handleSubmit = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  try {
    await cartStore.createOrder();
    cartStore.setDefaultState();
    isPopupVisible.value = true; // Показываем Popup
    useCartStore().setDefaultState();
    usePizzaStore().setDefault();
  } catch (error) {
    console.error("Ошибка при отправке заказа:", error);
  } finally {
    isSubmitting.value = false;
  }
};

dataStore.fetchMisc();
profileStore.fetchAddresses();
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

.cart__empty {
  padding: 20px 30px;
}

.footer {
  display: flex;
  align-items: center;

  margin-top: auto;
  padding: 25px 2.12%;

  background-color: rgba($green-500, 0.1);
}

.footer__more {
  width: 220px;
  margin-right: 16px;

  a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.footer__text {
  @include l-s11-h13;

  color: rgba($black, 0.5);
}

.footer__price {
  @include b-s24-h28;

  margin-right: 12px;
  margin-left: auto;
}

.footer__submit {
  button {
    padding: 16px 14px;
  }
}
</style>
