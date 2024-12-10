import { useDataStore } from "../stores";

const dataStore = useDataStore();

export const pizzaPrice = (state) => {
  var result = 0;
  result += dataStore.dough.find((d) => d.id == state.doughId).price;

  for (const ingredient in state.ingredients) {
    if (ingredient.quantity > 0) {
      result +=
        dataStore.ingredients.find((i) => i.id == ingredient.ingredientId)
          .price * ingredient.quantity;
    }
  }

  result += dataStore.sauce.find((s) => s.id == state.sauceId).price;

  result *= dataStore.sizes.find((s) => s.id == state.sizeId).multiplier;

  return result;
};
