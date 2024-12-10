import { useDataStore } from "../stores";
import { usePizzaStore } from "../stores";

const dataStore = useDataStore();
const pizzaStore = usePizzaStore();

export const pizzaPrice = () => {
  var result = 0;
  result += dataStore.dough.find((d) => d.id == pizzaStore.doughId).price;

  for (const ingredient in pizzaStore.ingredients) {
    if (ingredient.quantity > 0) {
      result +=
        dataStore.ingredients.find((i) => i.id == ingredient.ingredientId)
          .price * ingredient.quantity;
    }
  }

  result += dataStore.sauce.find((s) => s.id == pizzaStore.sauceId).price;

  result *= dataStore.sizes.find((s) => s.id == pizzaStore.sizeId).multiplier;

  return result;
};
