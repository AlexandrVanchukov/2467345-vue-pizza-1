export const getPublicImage = (path) => {
  const publicUrl = "/api";
  return `${publicUrl}${path}`.slice(0, -4);
};

export function removeDuplicatesByName(items) {
  const uniqueNames = new Set();
  const result = [];
  for (const item of items) {
    if (!uniqueNames.has(item.name)) {
      uniqueNames.add(item.name);
      result.push(item);
    }
  }
  return result;
}
