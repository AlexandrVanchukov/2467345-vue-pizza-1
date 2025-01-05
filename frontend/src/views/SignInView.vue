<template>
  <div class="sign-form">
    <router-link :to="{ name: 'home' }" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @submit.prevent="login">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <app-input
            v-model="email"
            type="email"
            name="email"
            class="input"
            placeholder="E-mail"
            :error-text="validations.email.error"
          />
        </label>
      </div>
      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <app-input
            v-model="password"
            type="password"
            name="password"
            class="input"
            placeholder="Пароль"
            :error-text="validations.password.error"
          />
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
      <div v-if="serverErrorMessage" class="server-error-message">
        {{ serverErrorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import AppInput from "../common/components/AppInput.vue";
import { validateFields, clearValidationErrors } from "../common/validator";
import { useRouter } from "vue-router";
import { useProfileStore } from "../stores/profile";
const router = useRouter();
const profileStore = useProfileStore();
const setEmptyValidations = () => ({
  email: {
    error: "",
    rules: ["required", "email"],
  },
  password: {
    error: "",
    rules: ["required"],
  },
});
const email = ref("");
const password = ref("");
const validations = ref(setEmptyValidations());
const serverErrorMessage = ref(null);
watch(email, () => {
  // Очищаем поля ошибок при вводе новых данных
  if (serverErrorMessage.value) serverErrorMessage.value = null;
  if (validations.value.email.error) clearValidationErrors(validations.value);
});
watch(password, () => {
  // Очищаем поля ошибок при вводе новых данных
  if (serverErrorMessage.value) serverErrorMessage.value = null;
  if (validations.value.password.error)
    clearValidationErrors(validations.value);
});
async function login() {
  if (
    !validateFields(
      { email: email.value, password: password.value },
      validations.value
    )
  ) {
    return;
  }
  const responseMessage = await profileStore.login(email.value, password.value);
  // Проверяем, если возвращается статус не 'ok', то показываем ошибку сервера
  if (responseMessage !== "ok") {
    serverErrorMessage.value = responseMessage;
  } else {
    // Получаем данные пользователя
    await profileStore.whoAmI();
    // Если логин без ошибок, перенаправляем на главную страницу
    await router.push({ name: "home" });
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.sign-form {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 455px;
  padding-top: 146px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;

  background: $white url("@/assets/img/popup.svg") no-repeat center top;
  box-shadow: $shadow-light;

  button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}

.sign-form__title {
  margin-bottom: 24px;

  text-align: center;
}

.sign-form__input {
  margin-bottom: 16px;
}

.close {
  position: absolute;
  top: 16px;
  right: 16px;

  width: 25px;
  height: 25px;

  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;

  color: $black;
  border-radius: 50%;
  outline: none;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 25px;
    height: 2px;

    content: "";

    border-radius: 2px;
    background-color: $black;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.5;
  }

  &:focus {
    &::before,
    &::after {
      background-color: $orange-100;
    }
  }

  &--white {
    &::before,
    &::after {
      background-color: $white;
    }
  }
}
</style>
