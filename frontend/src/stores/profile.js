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
  getters: {},
  actions: {},
});
