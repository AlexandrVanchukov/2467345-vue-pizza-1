import translations from "../common/data/doughSizes.js";

const translateName = (name) => {
  const translation = translations[name];
  if (!translation) {
    console.warn(`Translation for "${name}" not found.`);
    return name; // Возвращаем исходное значение, если перевод не найден
  }
  return translation;
};

export default translateName;
