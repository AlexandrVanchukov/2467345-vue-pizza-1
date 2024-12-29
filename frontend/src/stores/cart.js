import { defineStore } from "pinia";
import { useDataStore } from "./data";
import { getItemByIdOrDefault } from "../helpers/get-item-by-id-or-default";
import { pizzaPrice } from "../helpers/pizza-price";
import OrderService from "../services/OrderService";
import { useProfileStore } from "./profile";

export const useCartStore = defineStore("cart", {
  state: () => ({
    receivingOrderType: -1,
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
        (sum, pizza) => sum + pizzaPrice(pizza) * pizza.quantity,
        0
      );
      const miscPrice = state.misc.reduce(
        (sum, m) =>
          sum +
          getItemByIdOrDefault(useDataStore().misc, m.miscId).price *
            m.quantity,
        0
      );
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
    async createOrder() {
      const profileStore = useProfileStore();
      await OrderService.create({
        userId: profileStore.id || null,
        phone: this.phone,
        address: this.receivingOrderType <= 0 ? null : this.address,
        addressId: 39,
        pizzas: this.pizzas.map((e) => ({
          name: e.name,
          sauceId: e.sauceId,
          doughId: e.doughId,
          sizeId: e.sizeId,
          quantity: e.quantity,
          ingredients: e.ingredients.map((ingredient) => ({
            ingredientId: ingredient.ingredientId,
            quantity: ingredient.quantity,
          })),
        })),
        misc: this.misc,
      });
    },
    savePizza(pizza, quantity) {
      const q = quantity || 1;
      const { index, ...pizzaData } = pizza;
      const updatePizza = (i) => {
        this.pizzas[i] = {
          ...this.pizzas[i],
          ...pizzaData,
        };
      };
      const addNewPizza = () => {
        this.pizzas.push({
          quantity: q,
          index: this.pizzas.length,
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
      const removePizzaItem = () => {
        this.pizzas.splice(index, 1);
        this.pizzas.forEach((item, i) => {
          item.index = i;
        });
      };
      if (count === 0) {
        removePizzaItem();
      } else if (this.pizzas[index]) {
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
    setReceivingOrderType(type) {
      this.receivingOrderType = type;
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
    setDefaultState() {
      this.receivingOrderType = -1;
      this.phone = "";
      this.address = {
        street: "",
        building: "",
        flat: "",
        comment: "",
      };
      this.pizzas = [];
      this.misc = [];
    },
  },
});
