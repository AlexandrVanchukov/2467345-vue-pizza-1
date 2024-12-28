/* eslint-disable no-unused-vars */
import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    id: "1",
    name: "",
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
    orders: [
      {
        id: 0,
        userId: "user123",
        addressId: 1,
        orderPizzas: [
          {
            id: 0,
            name: "Margherita",
            sauceId: 1,
            doughId: 1,
            sizeId: 2,
            quantity: 2,
            orderId: 0,
            ingredients: [
              {
                id: 0,
                pizzaId: 0,
                ingredientId: 1,
                quantity: 1,
              },
              {
                id: 1,
                pizzaId: 0,
                ingredientId: 2,
                quantity: 1,
              },
            ],
          },
        ],
        orderMisc: [
          {
            id: 0,
            orderId: 0,
            miscId: 1,
            quantity: 1,
          },
        ],
        orderAddress: {
          id: 1,
          name: "Home",
          street: "Main St",
          building: "12A",
          flat: "34",
          comment: "Leave at the door",
          userId: "user123",
        },
      },
      {
        id: 1,
        userId: "user456",
        addressId: 2,
        orderPizzas: [
          {
            id: 1,
            name: "Pepperoni",
            sauceId: 2,
            doughId: 2,
            sizeId: 3,
            quantity: 1,
            orderId: 1,
            ingredients: [
              {
                id: 2,
                pizzaId: 1,
                ingredientId: 3,
                quantity: 2,
              },
              {
                id: 3,
                pizzaId: 1,
                ingredientId: 4,
                quantity: 1,
              },
            ],
          },
          {
            id: 2,
            name: "SUPERPepperoni",
            sauceId: 2,
            doughId: 2,
            sizeId: 3,
            quantity: 2,
            orderId: 1,
            ingredients: [
              {
                id: 4,
                pizzaId: 2,
                ingredientId: 3,
                quantity: 2,
              },
              {
                id: 5,
                pizzaId: 2,
                ingredientId: 4,
                quantity: 1,
              },
            ],
          },
        ],
        orderMisc: [
          {
            id: 1,
            orderId: 1,
            miscId: 2,
            quantity: 2,
          },
        ],
        orderAddress: {
          id: 2,
          name: "Office",
          street: "Broadway",
          building: "21",
          flat: "5B",
          comment: "Call on arrival",
          userId: "user456",
        },
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
      console.log(id);
      console.log(this.orders);
      this.orders = this.orders.filter((order) => order.id !== id);
      console.log(this.orders);
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
