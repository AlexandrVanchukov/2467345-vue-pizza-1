import { useProfileStore } from "../stores";
export function isAuthenticated() {
  const userStore = useProfileStore();
  if (!userStore.isAuthenticated) {
    return { path: "/login" };
  }
  return true;
}
