import prepareURLEncodedParams from "./prepareURLEncodedParams";
import Cookies from "js-cookie";

interface IAPIResponse {
  success: boolean;
  status: number;
  data: any;
  message?: any;
}

class FetchService {
  authStatusCodes: number[] = [401, 403, 404];
  authErrorURLs: string[] = ["/auth/login"];
  private activeRequests = new Map<string, AbortController>();
  private _fetchType: string;
  private requestCounter = 0;
  constructor(fetchTypeValue = "json") {
    this._fetchType = fetchTypeValue;
  }

  configureAuthorization(config: any) {
    const accessToken = Cookies.get("token") || "";
    config.headers["Authorization"] = "Bearer " + accessToken;
  }

  setHeader(config: any) {
    config.headers = {};
  }

  setDefaultHeaders(config: any) {
    config.headers = config.headers || {};
    if (!config.headers["Content-Type"] && !(config.body instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
  }

  checkToLogOutOrNot(path: string) {
    return this.authErrorURLs.some((arrayUrl: string) =>
      path.includes(arrayUrl)
    );
  }

  isAuthRequest(path: string) {
    return this.authErrorURLs.includes(path);
  }

  private getRequestKey(
    path: string,
    method: string = "GET",
    allowConcurrent: boolean = false
  ): string {
    if (allowConcurrent) {
      return `${method}-${path}-${++this.requestCounter}`;
    }
    return `${method}-${path}`;
  }

  async refreshAccessToken(): Promise<string | null> {
    const refreshToken = Cookies.get("refresh_token");

    if (!refreshToken) {
      window.location.href = "/";
      return null;
    }
    try {
      const response = await fetch(
        import.meta.env.VITE_PUBLIC_API_URL + "/refresh-token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!response.ok) {
        Cookies.remove("token");
        Cookies.remove("refresh_token");
        window.location.href = "/";
        return null;
      }

      const data = await response.json();
      Cookies.set("token", data.access_token);
      return data.access_token;
    } catch (error) {
      window.location.href = "/";
      return null;
    }
  }

  async hit(...args: any): Promise<IAPIResponse> {
    const [path, config = {}] = args;
    const method = config.method || "GET";
    const allowConcurrent =
      config.allowConcurrent ??
      (method === "POST" || method === "PUT" || method === "PATCH");
    const requestKey = this.getRequestKey(path, method, allowConcurrent);
    if (!allowConcurrent) {
      const existingController = this.activeRequests.get(requestKey);
      if (existingController) {
        existingController.abort();
      }
    }
    const abortController = new AbortController();
    config.signal = abortController.signal;
    this.activeRequests.set(requestKey, abortController);

    config.headers = config.headers || {};
    if (!config.headers["Content-Type"] && !(config.body instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    if (!this.isAuthRequest(path)) {
      this.configureAuthorization(config);
    }

    const url = import.meta.env.VITE_PUBLIC_API_URL + path;
    let response: any;

    try {
      response = await fetch(url, config);

      if (
        !response.ok &&
        response.status === 401 &&
        !this.checkToLogOutOrNot(path)
      ) {
        const newToken = await this.refreshAccessToken();
        if (newToken) {
          config.headers["Authorization"] = "Bearer " + newToken;
          response = await fetch(url, config);
        }
      }

      this.activeRequests.delete(requestKey);
    } catch (error: any) {
      this.activeRequests.delete(requestKey);

      if (error.name === "AbortError") {
        return {
          success: false,
          status: 0,
          data: null,
          message: "Request cancelled",
        };
      }
      throw {
        success: false,
        status: 0,
        data: null,
        message: error.message || "Network error",
      };
    }

    if (!response.ok) {
      if (
        this.authStatusCodes.includes(response.status) &&
        !this.checkToLogOutOrNot(path)
      ) {
        const contentType = response.headers.get("Content-Type") || "";
        let errorData;
        try {
          errorData = contentType.includes("text/html")
            ? await response.text()
            : await response.json();
        } catch {
          errorData = { message: response.statusText };
        }
        throw {
          success: false,
          status: response.status,
          data: errorData,
          message: response.statusText,
        };
      }
      const contentType = response.headers.get("Content-Type") || "";
      let errorData;
      try {
        errorData = contentType.includes("text/html")
          ? await response.text()
          : await response.json();
      } catch {
        errorData = { message: response.statusText };
      }
      const err: any = new Error(errorData.message || response.statusText);
      err.data = errorData;
      err.status = response.status;
      throw err;
    }

    if (this._fetchType === "response") {
      return response;
    } else {
      const contentType = response.headers.get("Content-Type") || "";
      if (contentType.includes("text/html")) {
        return {
          success: true,
          status: response.status,
          data: await response.text(),
        };
      }
      return {
        success: true,
        status: response.status,
        data: await response.json(),
      };
    }
  }

  async post(url: string, payload?: any) {
    return await this.hit(url, {
      method: "POST",
      body: payload ? JSON.stringify(payload) : undefined,
    });
  }

  async postFormData(url: string, file?: File) {
    return await this.hit(url, {
      method: "POST",
      body: file,
    });
  }

  async get(url: string, queryParams = {}, contentType?: string) {
    if (Object.keys(queryParams).length) {
      url = prepareURLEncodedParams(url, queryParams);
    }
    const config: any = {
      method: "GET",
    };
    this.setDefaultHeaders(config);
    if (contentType) {
      config.headers["Content-Type"] = contentType;
      config.headers["Accept"] = contentType;
    }
    return this.hit(url, config);
  }

  async delete(url: string, payload = {}) {
    return this.hit(url, {
      method: "DELETE",
      body: JSON.stringify(payload),
    });
  }

  async deleteWithOutPayload(url: string) {
    return this.hit(url, {
      method: "DELETE",
    });
  }

  async put(url: string, payload = {}) {
    return this.hit(url, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  async patch(url: string, payload = {}) {
    return this.hit(url, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  }

  cancelAll() {
    this.activeRequests.forEach((controller) => controller.abort());
    this.activeRequests.clear();
  }
}

export const $fetch = new FetchService();
