import { HttpClient } from "./HttpClient";
import httpProvider from "./providers";
const BASE_URL = "/api/addresses";
class AddressService extends HttpClient {
  async fetch() {
    try {
      return this.get("/");
    } catch (e) {
      throw Error(e);
    }
  }
  async createPost(post) {
    try {
      return this.post("/", { data: post });
    } catch (e) {
      throw Error(e);
    }
  }
  async updatePost(post) {
    try {
      return this.put(`/${post.id}`, { data: post });
    } catch (e) {
      throw Error(e);
    }
  }
  async deletePost(id) {
    try {
      await this.delete(`/${id}`);
    } catch (e) {
      throw Error(e);
    }
  }
}
export default new AddressService({
  httpProvider,
  baseURL: BASE_URL,
});
