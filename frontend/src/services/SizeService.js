import { HttpClient } from "./HttpClient";
import httpProvider from "./providers";
const BASE_URL = "/api/sizes";
class SizeService extends HttpClient {
  async fetch() {
    try {
      return this.get("/");
    } catch (e) {
      throw Error(e);
    }
  }
}
export default new SizeService({
  httpProvider,
  baseURL: BASE_URL,
});
