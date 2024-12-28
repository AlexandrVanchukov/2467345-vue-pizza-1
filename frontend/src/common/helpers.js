export const getPublicImage = (path) => {
  const publicUrl = "/api";
  return `${publicUrl}${path}`.slice(0, -4);
};
