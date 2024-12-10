import { defineStore } from "@pinia";
import { useDataStore } from "@/stores/dataStore";
import { pizzaPrice } from "../helpers";

const getItemByIdOrDefault = (dataArray, id) => {
  return dataArray.find((item) => item.id === id) ?? dataArray[0];
};

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    index: null,
    name: "",
    sauceId: 0,
    doughId: 0,
    sizeId: 0,
    ingredients: [
      {
        ingredientId: 0,
        quantity: 0,
      },
    ],
  }),
  getters: {
    getDataStore: () => useDataStore(),
    sauce: (state) =>
      getItemByIdOrDefault(useDataStore().sauces, state.sauceId),
    dough: (state) =>
      getItemByIdOrDefault(useDataStore().doughs, state.doughId),
    size: (state) => getItemByIdOrDefault(useDataStore().sizes, state.sizeId),
    ingredientsExtended: (state) => {
      const pizzaIngredientsIds = new Set(
        state.ingredients.map((i) => i.ingredientId)
      );
      const ingredientsMap = new Map(
        state.ingredients.map((i) => [i.ingredientId, i.quantity])
      );
      return useDataStore()
        .ingredients.filter((i) => pizzaIngredientsIds.has(i.id))
        .map((i) => ({
          ...i,
          quantity: ingredientsMap.get(i.id) ?? 0,
        }));
    },
    price: (state) => pizzaPrice(state),
  },
  actions: {},
});
