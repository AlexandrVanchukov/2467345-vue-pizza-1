import AxiosProvider from "./AxiosProvider";
// import { useProfileStore } from "../../stores";
export const httpProvider = new AxiosProvider();
httpProvider.addInterceptor({
  onError: async (status) => {
    if (status === 401) {
      //   const authStore = useProfileStore();
      //   if (authStore.isAuthenticated) await authStore.logout();
    }
  },
});
export default httpProvider;
