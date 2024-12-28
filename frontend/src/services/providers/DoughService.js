import { HttpClient } from "./HttpClient";
import AxiosProvider from "./providers/AxiosProvider";
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
  httpProvider: new AxiosProvider(),
  baseURL: BASE_URL,
});
