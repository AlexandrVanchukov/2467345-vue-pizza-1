import { defineStore } from "pinia";
import { useDataStore } from "./data";
import { pizzaPrice, getItemByIdOrDefault } from "../helpers";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    index: null,
    name: "",
    sauceId: 1,
    doughId: 1,
    sizeId: 1,
    ingredients: [
      {
        ingredientId: 1,
        quantity: 3,
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
  actions: {
    setIndex(index) {
      this.index = index;
    },
    setName(name) {
      this.name = name;
    },
    setSauce(sauceId) {
      this.sauceId = sauceId;
    },
    setDough(doughId) {
      this.doughId = doughId;
    },
    setSize(sizeId) {
      this.sizeId = sizeId;
    },
    setIngredients(ingredients) {
      this.ingredients = ingredients;
    },
    addIngredient(ingredientId) {
      this.ingredients.push({
        ingredientId,
        quantity: 1,
      });
    },
    incrementIngredientQuantity(ingredientId) {
      const ingredient = this.ingredients.find(
        (item) => item.ingredientId === ingredientId
      );
      if (ingredient) {
        ingredient.quantity++;
      } else {
        this.addIngredient(ingredientId);
      }
    },
    setIngredientQuantity(ingredientId, count) {
      const ingredientIdx = this.ingredients.findIndex(
        (item) => item.ingredientId === ingredientId
      );

      if (ingredientIdx === -1) {
        if (count > 0) {
          this.addIngredient(ingredientId);
        }
        return;
      }

      if (count === 0) {
        this.ingredients.splice(ingredientIdx, 1);
      } else {
        this.ingredients[ingredientIdx].quantity = count;
      }
    },

    removeIngredient(ingredientId) {
      const id = this.ingredients.findIndex(
        (item) => item.ingredientId === ingredientId
      );
      if (id !== -1) {
        this.ingredients.splice(id, 1);
      }
    },

    loadPizza(pizza) {
      this.index = pizza.index;
      this.name = pizza.name;
      this.sauceId = pizza.sauceId;
      this.doughId = pizza.doughId;
      this.sizeId = pizza.sizeId;
      this.ingredients = pizza.ingredients;
    },

    setDefault() {
      this.index = null;
      this.name = "";
      this.sauceId = 1;
      this.doughId = 1;
      this.sizeId = 1;
      this.ingredients = [
        {
          ingredientId: 1,
          quantity: 3,
        },
      ];
    },
  },
});
