import { useDataStore } from "../stores/data";

// const dataStore = useDataStore();

export const pizzaPrice = (state) => {
  if (
    useDataStore().dough.length === 0 ||
    useDataStore().ingredients.length === 0 ||
    useDataStore().sauce.length === 0
  ) {
    return 0;
  }
  var result = 0;
  result += useDataStore().dough.find((d) => d.id == state.doughId).price;

  state.ingredients.forEach(function (ingredient) {
    if (ingredient.quantity > 0) {
      result +=
        useDataStore().ingredients.find((i) => i.id == ingredient.ingredientId)
          .price * ingredient.quantity;
    }
  });

  result += useDataStore().sauce.find((s) => s.id == state.sauceId).price;

  result *= useDataStore().sizes.find((s) => s.id == state.sizeId).multiplier;

  return result;
};
