export const transformIngredients = (pinIngredients, ingredientMap) => {
  const result = ingredientMap.reduce((acc, ingredient) => {
    acc[ingredient.name_eng] = 0;
    return acc;
  }, {});

  pinIngredients.forEach(({ ingredientId, quantity }) => {
    const ingredient = ingredientMap.find((item) => item.id === ingredientId);
    if (ingredient) {
      result[ingredient.name_eng] = quantity;
    }
  });

  return result;
};

export const reverseTransformIngredients = (ingredients, ingredientMap) => {
  const result = Object.entries(ingredients)
    .filter(([name, quantity]) => quantity > 0)
    .map(([name, quantity]) => {
      const ingredient = ingredientMap.find((item) => item.name_eng === name);
      return ingredient ? { ingredientId: ingredient.id, quantity } : null;
    })
    .filter(Boolean);

  return result;
};
