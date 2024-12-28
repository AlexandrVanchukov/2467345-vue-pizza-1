import { createApp } from "vue";
import { createPinia } from "pinia";
import { useProfileStore } from './stores/profile';
import { getToken, removeToken } from "./services/token-manager";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

const token = getToken();
if (token) {
  try {
    const authStore = useProfileStore();
    await authStore.whoAmI();
    await router.push({ name: "home" });
  } catch (e) {
    removeToken();
    console.log(e);
  }
}