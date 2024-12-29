import { defineStore } from "pinia";

import DoughService from "../services/DoughService";
import IngredientService from "../services/IngredientService";
import SauceService from "../services/SauceService";
import SizeService from "../services/SizeService";
import MiscService from "../services/MiscService";

import { translateNameToEng } from "../helpers/translate-name";

import { removeDuplicatesByName } from "../common/helpers";

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
      this.dough = removeDuplicatesByName(
        translateNames(await DoughService.fetch())
      );
    },
    async fetchIngredients() {
      this.ingredients = removeDuplicatesByName(
        translateNames(await IngredientService.fetch())
      );
    },
    async fetchSauces() {
      this.sauce = removeDuplicatesByName(
        translateNames(await SauceService.fetch())
      );
    },
    async fetchSizes() {
      this.sizes = removeDuplicatesByName(await SizeService.fetch());
    },
    async fetchMisc() {
      this.misc = removeDuplicatesByName(
        translateNames(await MiscService.fetch())
      );
    },
  },
});
