<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>
    <div class="user">
      <picture>
        <source
          type="image/webp"
          :srcset="
            (profileStore.getAvatar + '@2x.webp 1x',
            profileStore.getAvatar + '@4x.webp 2x')
          "
        />
        <img
          :src="profileStore.getAvatar + '@2x.webp'"
          :srcset="profileStore.getAvatar + '@4x.webp'"
          :alt="profileStore.getName"
          width="72"
          height="72"
        />
      </picture>
      <div class="user__name">
        <span>{{ profileStore.getName }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span>{{ profileStore.getPhone }}</span>
      </p>
    </div>
    <div class="layout__address">
      <div
        v-for="address in profileStore.getAddresses"
        :key="address.id"
        class="sheet address-form"
      >
        <div
          v-if="editingAddressId === address.id"
          class="address-form--opened"
        >
          <!-- Форма редактирования адреса -->
          <div class="address-form__header">
            <b>Редактирование: {{ editingAddress.name }}</b>
          </div>
          <div class="address-form__wrapper">
            <div class="address-form__input">
              <label class="input">
                <span>Название адреса*</span>
                <input
                  v-model="editingAddress.name"
                  type="text"
                  placeholder="Введите название адреса"
                  required
                />
              </label>
            </div>
            <div class="address-form__input address-form__input--size--normal">
              <label class="input">
                <span>Улица*</span>
                <input
                  v-model="editingAddress.street"
                  type="text"
                  placeholder="Введите название улицы"
                  required
                />
              </label>
            </div>
            <div class="address-form__input address-form__input--size--small">
              <label class="input">
                <span>Дом*</span>
                <input
                  v-model="editingAddress.building"
                  type="text"
                  placeholder="Введите номер дома"
                  required
                />
              </label>
            </div>
            <div class="address-form__input address-form__input--size--small">
              <label class="input">
                <span>Квартира</span>
                <input
                  v-model="editingAddress.flat"
                  type="text"
                  placeholder="Введите № квартиры"
                />
              </label>
            </div>
            <div class="address-form__input">
              <label class="input">
                <span>Комментарий</span>
                <input
                  v-model="editingAddress.comment"
                  type="text"
                  placeholder="Введите комментарий"
                />
              </label>
            </div>
          </div>
          <div class="address-form__buttons">
            <button
              type="button"
              class="button button--transparent"
              @click="deleteAddress(editingAddress.id)"
            >
              Удалить
            </button>

            <button type="button" class="button" @click="saveEdit()">
              Сохранить
            </button>
          </div>
        </div>
        <div v-else>
          <!-- Отображение адреса -->
          <div class="address-form__header">
            <b>{{ address.name }}</b>
            <div class="address-form__edit">
              <button type="button" class="icon" @click="editAddress(address)">
                <span class="visually-hidden">Изменить адрес</span>
              </button>
            </div>
          </div>
          <p>
            {{ address.street }}, д. {{ address.building }}
            <span v-if="address.flat">, кв. {{ address.flat }}</span>
          </p>
          <small v-if="address.comment">{{ address.comment }}</small>
        </div>
      </div>
      <!-- Форма добавления нового адреса -->
      <div
        v-if="addingNewAddress"
        class="sheet address-form address-form--opened"
      >
        <div class="address-form__header">
          <b>Добавление нового адреса</b>
        </div>
        <div class="address-form__wrapper">
          <div class="address-form__input">
            <label class="input">
              <span>Название адреса*</span>
              <input
                v-model="newAddress.name"
                type="text"
                placeholder="Введите название адреса"
                required
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--normal">
            <label class="input">
              <span>Улица*</span>
              <input
                v-model="newAddress.street"
                type="text"
                placeholder="Введите название улицы"
                required
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Дом*</span>
              <input
                v-model="newAddress.building"
                type="text"
                placeholder="Введите номер дома"
                required
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Квартира</span>
              <input
                v-model="newAddress.flat"
                type="text"
                placeholder="Введите № квартиры"
              />
            </label>
          </div>
          <div class="address-form__input">
            <label class="input">
              <span>Комментарий</span>
              <input
                v-model="newAddress.comment"
                type="text"
                placeholder="Введите комментарий"
              />
            </label>
          </div>
        </div>
        <div class="address-form__buttons">
          <button
            type="button"
            class="button button--transparent"
            @click="cancelAddAddress"
          >
            Отменить
          </button>
          <button type="button" class="button" @click="saveNewAddress">
            Добавить
          </button>
        </div>
      </div>
    </div>
    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        @click="openAddAddressForm"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useProfileStore } from "../stores";

const profileStore = useProfileStore();

// Состояние для редактирования
const editingAddressId = ref(null);
const editingAddress = ref(null);

const addingNewAddress = ref(false);
const newAddress = ref({
  name: "",
  street: "",
  building: "",
  flat: "",
  comment: "",
  userId: profileStore.id,
});

// Методы
function editAddress(address) {
  editingAddressId.value = address.id;
  editingAddress.value = { ...address }; // Копия адреса для редактирования
}

function cancelEdit() {
  editingAddressId.value = null;
  editingAddress.value = null;
}

function deleteAddress(addressId) {
  profileStore.deleteAddress(addressId);
  cancelEdit();
}

function saveEdit() {
  profileStore.updateAddress(editingAddress.value);
  cancelEdit();
}

function openAddAddressForm() {
  addingNewAddress.value = true;
  newAddress.value = {
    name: "",
    street: "",
    building: "",
    flat: "",
    comment: "",
    userId: profileStore.id,
  };
}

function cancelAddAddress() {
  addingNewAddress.value = false;
  newAddress.value = {};
}

function saveNewAddress() {
  profileStore.addAddress(newAddress.value);
  cancelAddAddress();
}

profileStore.fetchAddresses();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.layout__address {
  margin-top: 16px;
}

.user {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-bottom: 33px;
}

.user__name {
  @include b-s20-h23;

  margin-left: 30px;

  span {
    display: inline-block;

    vertical-align: middle;
  }
}

.user__button {
  display: inline-block;

  cursor: pointer;
  vertical-align: middle;
}

.user__phone {
  @include b-s16-h19;

  width: 100%;
  margin-top: 20px;

  span {
    font-weight: 400;
  }
}

.address-form {
  $bl: &;

  position: relative;

  padding-top: 0;
  padding-bottom: 26px;

  &--opened {
    #{$bl}__header {
      padding: 16px;
    }
  }

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }

  small {
    @include l-s11-h13;

    display: block;

    padding: 0 16px;
  }
}

.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 80%;
  padding: 16px;
}

.address-form__input {
  width: 100%;
  margin-bottom: 16px;

  &--size {
    &--normal {
      width: 60.5%;
    }

    &--small {
      width: 18%;
    }
  }
}

.address-form__buttons {
  display: flex;
  justify-content: flex-end;

  padding: 0 16px;

  button {
    margin-left: 16px;
    padding: 16px 27px;
  }
}

.address-form__header {
  @include b-s14-h16;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 21px;
  padding: 10px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);
}

.icon {
  display: block;
  overflow: hidden;

  width: 32px;
  height: 32px;

  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;
  background-color: $white;
  background-image: url("@/assets/img/edit.svg");
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    box-shadow: $shadow-light;
  }

  &:active {
    box-shadow: $shadow-large;
  }

  &:focus {
    box-shadow: $shadow-regular;
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
