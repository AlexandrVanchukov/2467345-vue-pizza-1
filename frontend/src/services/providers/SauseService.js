import { HttpClient } from "./HttpClient";
import AxiosProvider from "./providers/AxiosProvider";
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
  httpProvider: new AxiosProvider(),
  baseURL: BASE_URL,
});
