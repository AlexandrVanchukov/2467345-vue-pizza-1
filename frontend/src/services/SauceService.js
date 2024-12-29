import { HttpClient } from "./HttpClient";
import httpProvider from "./providers";
const BASE_URL = "/api/sauces";
class SauceService extends HttpClient {
  async fetch() {
    try {
      return this.get("/");
    } catch (e) {
      throw Error(e);
    }
  }
}
export default new SauceService({
  httpProvider,
  baseURL: BASE_URL,
});
