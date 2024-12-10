import { defineStore } from "pinia";

export const useDataStore = defineStore("data", {
  state: () => ({
    dough: [],
    ingredients: [],
    misc: [],
    sauce: [],
    sizes: [],
  }),
  getters: {},
  actions: {},
});
