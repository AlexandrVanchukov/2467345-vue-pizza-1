import translations_dough from "../common/data/doughSizes.js";
import translations_ingredients from "../common/data/ingredients.js";

const translations = {
  ...translations_dough,
  ...translations_ingredients,
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
