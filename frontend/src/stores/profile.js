/* eslint-disable no-unused-vars */
import { defineStore } from "pinia";
import AuthService from "../services/AuthService";
import AddressService from "../services/AddressService";
import OrderService from "../services/OrderService";
import { removeToken, setToken } from "../services/token-manager";
import { getPublicImage } from "../common/helpers";
import { useCartStore } from "./cart";
import { usePizzaStore } from "./pizza";

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

      // useCartStore().setDefaultState();
      // usePizzaStore().setDefault();

      this.id = "";
      this.name = "";
      this.email = "";
      this.avatar = "";
      this.phone = "";
      this.orders = [];
      this.addresses = [];

      removeToken();
    },
    async fetchAddresses() {
      this.addresses = await AddressService.fetch();
    },
    async fetchOrders() {
      this.orders = await OrderService.fetch();
    },
    async deleteOrder(id) {
      const indexInStore = this.orders.findIndex((order) => order.id == id);
      this.orders.splice(indexInStore, 1);
      await OrderService.deleteOrder(id);
    },
    addOrder(order) {
      this.orders.push(order);
    },
    clearOrders() {
      this.orders = [];
    },
    async addAddress(address) {
      const res = await AddressService.create({
        ...address,
        userId: this.id,
      });
      if (res.id != undefined) {
        this.addresses.push(res);
      }
    },
    async deleteAddress(id) {
      const res = await AddressService.deleteAddress(id);
      this.addresses = this.addresses.filter((address) => address.id !== id);
    },
    async updateAddress(address) {
      const res = await AddressService.update(address);
      this.addresses = this.addresses.map((i) =>
        i.id === address.id ? address : i
      );
    },
  },
});
