/* eslint-disable no-unused-vars */
import { defineStore } from "pinia";
import AuthService from "../services/AuthService";
import { removeToken, setToken } from "../services/token-manager";
import { getPublicImage } from "../common/helpers";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    id: "",
    name: "",
    email: "",
    avatar: "",
    phone: "",
    addresses: [],
    orders: [],
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
      return getPublicImage(state.avatar);
    },
    getPhone: (state) => {
      return state.phone;
    },
    getAddresses: (state) => {
      return state.addresses;
    },
    isAuthenticated: (state) => Boolean(state.email),
  },
  actions: {
    async login(email, password) {
      try {
        const data = await AuthService.login(email, password);
        setToken(data.token);
        return "ok";
      } catch (e) {
        return e.message;
      }
    },
    async whoAmI() {
      const userData = await AuthService.whoAmI();
      this.id = userData.id;
      this.name = userData.name;
      this.email = userData.email;
      this.avatar = userData.avatar;
      this.phone = userData.phone;
    },
    async logout(sendRequest = true) {
      await AuthService.logout();

      this.id = "";
      this.name = "";
      this.email = "";
      this.avatar = "";
      this.phone = "";
      this.orders = [];
      this.addresses = [];

      removeToken();
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
