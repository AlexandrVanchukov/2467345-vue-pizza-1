import axios from "axios";
export default class AxiosProvider {
  computeQueryParams(query) {
    if (!query) return "";
    const queryParams = new URLSearchParams(query);
    return "?" + queryParams.toString();
  }
  async request(options) {
    const url =
      options.baseUrl + options.path + this.computeQueryParams(options.query);
    const config = {
      headers: options.headers,
      method: options.method,
      url,
    };
    if (options.data) {
      config.data = options.data;
    }
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      await this.onError(error);
    }
  }
  async onError(error) {
    if (error.response) {
      const { data } = error.response;
      throw new Error(data.error.message || "An error occurred");
    } else if (error.request) {
      throw new Error("No response received from the server");
    } else {
      throw new Error(error.message);
    }
  }
  async get(path, requestOptions) {
    return this.request({ path, method: "GET", ...requestOptions });
  }
  async post(path, requestOptions) {
    return this.request({ path, method: "POST", ...requestOptions });
  }
  async put(path, requestOptions) {
    return this.request({ path, method: "PUT", ...requestOptions });
  }
  async delete(path, requestOptions) {
    return this.request({ path, method: "DELETE", ...requestOptions });
  }
}
