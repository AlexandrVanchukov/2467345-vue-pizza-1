import { HttpClient } from "./HttpClient";
import httpProvider from "./providers";
const BASE_URL = "/api/misc";
class MiscService extends HttpClient {
  async fetch() {
    try {
      return this.get("/");
    } catch (e) {
      throw Error(e);
    }
  }
}
export default new MiscService({
  httpProvider,
  baseURL: BASE_URL,
});
