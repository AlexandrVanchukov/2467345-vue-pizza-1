import { defineStore } from "@pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    phone: "",
    address: {
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
    pizzas: [],
    misc: [],
  }),
  getters: {
    totalCartPrice: (state) => {
      const pizzasPrice = state.pizzas.reduce(
        (sum, pizza) => sum + pizza.price,
        0
      );
      const miscPrice = state.misc.reduce((sum, m) => sum + m.price, 0);
      return pizzasPrice + miscPrice;
    },
    getPhone: (state) => {
      return state.phone;
    },
    getAddress: (state) => {
      return state.address;
    },
    getPizzas: (state) => {
      return state.pizzas;
    },
    getMisc: (state) => {
      return state.misc;
    },
  },
  actions: {
    savePizza(pizza) {
      const { index, ...pizzaData } = pizza;
      const updatePizza = (i) => {
        this.pizzas[i] = {
          ...this.pizzas[i],
          ...pizzaData,
        };
      };
      const addNewPizza = () => {
        this.pizzas.push({
          quantity: 1,
          ...pizzaData,
        });
      };
      if (index !== null && index >= 0) {
        updatePizza(index);
      } else {
        addNewPizza();
      }
    },
    setPizzaQuantity(index, count) {
      if (this.pizzas[index]) {
        this.pizzas[index].quantity = count;
      }
    },
    setMiscQuantity(miscId, count) {
      const miscIdx = this.misc.findIndex((item) => item.miscId === miscId);
      const addMiscItem = () => {
        this.misc.push({ miscId, quantity: 1 });
      };
      const removeMiscItem = () => {
        this.misc.splice(miscIdx, 1);
      };
      const updateMiscQuantity = () => {
        this.misc[miscIdx].quantity = count;
      };
      if (miscIdx === -1) {
        if (count > 0) addMiscItem();
      } else {
        if (count === 0) {
          removeMiscItem();
        } else {
          updateMiscQuantity();
        }
      }
    },
    setPhone(phone) {
      this.phone = phone;
    },
    setAddress(address) {
      const { street, building, flat, comment } = address;
      this.address = { street, building, flat, comment };
    },
    setStreet(street) {
      this.address.street = street;
    },
    setBuilding(building) {
      this.address.building = building;
    },
    setFlat(flat) {
      this.address.flat = flat;
    },
    setComment(comment) {
      this.address.street = comment;
    },
  },
});
