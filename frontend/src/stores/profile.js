/* eslint-disable no-unused-vars */
import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    id: "1",
    name: "Ванчуков Александр",
    email: "vanchukov.job@mail.ru",
    avatar: "",
    phone: "89024156728",
    addresses: [
      {
        id: 1,
        name: "Офис на невском",
        street: "Невский пр.",
        building: "42",
        flat: "",
        comment: "Код от домофона 2789",
        userId: "1",
      },
      {
        id: 2,
        name: "Дом",
        street: "Ул Рябикова",
        building: "42",
        flat: "12",
        comment: "Код от домофона 2789",
        userId: "1",
      },
    ],
  }),
  getters: {
    getOrders: (state) => {
      return state.orders;
    },
    getName: (state) => {
      console.log(state.name);
      return state.name;
    },
    getEmail: (state) => {
      return state.email;
    },
    getAvatar: (state) => {
      return state.avatar;
    },
    getPhone: (state) => {
      return state.phone;
    },
    getAddresses: (state) => {
      return state.addresses;
    },
  },
  actions: {
    login(email, password) {},
    logout() {
      this.id = 0;
      this.name = "";
      this.email = "";
      this.avatar = "";
      this.phone = "";
      this.orders = [];
      this.addresses = [];
    },
    addOrder(order) {
      this.orders.push(order);
    },
    deleteOrder(id) {
      this.orders = this.orders.filter((order) => order.id !== id);
    },
    clearOrders() {
      this.orders = [];
    },
    addAddress(address) {
      this.addresses.push(address);
    },
    deleteAddress(id) {
      this.addresses = this.addresses.filter((address) => address.id !== id);
    },
    editAddress(id, updatedAddress) {
      const index = this.addresses.findIndex((address) => address.id === id);
      if (index !== -1) {
        this.addresses[index] = { ...this.addresses[index], ...updatedAddress };
      }
    },
  },
});
