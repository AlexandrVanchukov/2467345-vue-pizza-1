import dough from "../common/data/doughSizes.js";
import ingredients from "../common/data/ingredients.js";
import sauces from "../common/data/sauces.js";

const translations = {
  ...dough,
  ...ingredients,
  ...sauces,
};

const translateName = (name) => {
  const translation = translations[name];
  if (!translation) {
    console.warn(`Translation for "${name}" not found.`);
    return name; // Возвращаем исходное значение, если перевод не найден
  }
  return translation;
};

export default translateName;
