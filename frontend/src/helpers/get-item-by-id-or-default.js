export const getItemByIdOrDefault = (dataArray, id) => {
  return dataArray.find((item) => item.id === id) ?? dataArray[0];
};
