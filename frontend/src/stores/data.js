import { defineStore } from "pinia";

import doughJSON from "../mocks/dough.json";
import ingredientsJSON from "../mocks/ingredients.json";
import saucesJSON from "../mocks/sauces.json";
import sizesJSON from "../mocks/sizes.json";
import miscJSON from "../mocks/misc.json";

import DoughService from "../services/DoughService";
import IngredientService from "../services/IngredientService";
import SauceService from "../services/SauceService";
import SizeService from "../services/SizeService";
import MiscService from "../services/MiscService";

import { translateNameToEng } from "../helpers/translate-name";

function translateNames(dataJSON) {
  const updatedJSON = dataJSON.map((item) => ({
    ...item,
    name_eng: translateNameToEng(item.name),
  }));

  return updatedJSON;
}

export const useDataStore = defineStore("data", {
  state: () => ({
    dough: [],
    ingredients: [],
    sauce: [],
    sizes: [],
    misc: [],
  }),
  getters: {},
  actions: {
    async fetchDough() {
      this.dough = translateNames(await DoughService.fetch()).slice(0, 2);
    },
    async fetchIngredients() {
      this.ingredients = translateNames(await IngredientService.fetch()).slice(
        0,
        15
      );
    },
    async fetchSauces() {
      this.sauce = translateNames(await SauceService.fetch()).slice(0, 2);
    },
    async fetchSizes() {
      this.sizes = (await SizeService.fetch()).slice(0, 3);
    },
    async fetchMisc() {
      this.misc = translateNames(await MiscService.fetch()).slice(0, 3);
    },
  },
});
