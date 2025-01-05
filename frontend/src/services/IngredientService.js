import { HttpClient } from "./HttpClient";
import httpProvider from "./providers";
const BASE_URL = "/api/ingredients";
class IngredientService extends HttpClient {
  async fetch() {
    try {
      return this.get("/");
    } catch (e) {
      throw Error(e);
    }
  }
}
export default new IngredientService({
  httpProvider,
  baseURL: BASE_URL,
});
