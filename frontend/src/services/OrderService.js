import { HttpClient } from "./HttpClient";
import httpProvider from "./providers";
import { getToken } from "./token-manager";
const BASE_URL = "/api/orders";
class OrderService extends HttpClient {
  async fetch() {
    try {
      return this.get("/");
    } catch (e) {
      throw Error(e);
    }
  }
  async create(data) {
    try {
      return this.post("/", { data });
    } catch (e) {
      throw Error(e);
    }
  }
  async deleteOrder(id) {
    try {
      await this.delete(`/${id}`);
    } catch (e) {
      throw Error(e);
    }
  }
}
export default new OrderService({
  httpProvider,
  baseURL: BASE_URL,
  getToken,
});
