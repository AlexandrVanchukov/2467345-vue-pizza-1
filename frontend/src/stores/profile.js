import { defineStore } from "@pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile: {
      id: "",
      name: "",
      email: "",
      avatar: "",
      phone: "",
      addresses: [],
    },
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
      return state.avatar;
    },
    getPhone: (state) => {
      return state.phone;
    },
    getAddresses: (state) => {
      return state.addresses;
    },
  },
  actions: {},
});
