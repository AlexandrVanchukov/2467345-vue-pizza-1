export const findNameById = (store, index) => {
  return store.find((d) => d.id == index).name;
};
