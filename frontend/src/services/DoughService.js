import { HttpClient } from "./HttpClient";
import httpProvider from "./providers";
const BASE_URL = "/api/dough";
class DoughService extends HttpClient {
  async fetch() {
    try {
      return this.get("/");
    } catch (e) {
      throw Error(e);
    }
  }
}
export default new DoughService({
  httpProvider,
  baseURL: BASE_URL,
});
