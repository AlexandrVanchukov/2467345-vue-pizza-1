import { defineStore } from "pinia";

import doughJSON from "../mocks/dough.json";
import ingredientsJSON from "../mocks/ingredients.json";
import saucesJSON from "../mocks/sauces.json";
import sizesJSON from "../mocks/sizes.json";
import miscJSON from "../mocks/misc.json";

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
    dough: translateNames(doughJSON),
    ingredients: translateNames(ingredientsJSON),
    sauce: translateNames(saucesJSON),
    sizes: sizesJSON,
    misc: translateNames(miscJSON),
  }),
  getters: {},
  actions: {},
});
