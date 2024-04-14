import { AxiosRequestConfig } from "axios";

export class RequestOptionsBuilder {
  private baseUrl: string;

  private constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  static getInstance(baseUrl: string): RequestOptionsBuilder {
    return new RequestOptionsBuilder(baseUrl);
  }

  buildRequestOptions(
    url: string,
    method: string,
    headers: Record<string, string> = {}
  ): AxiosRequestConfig {
    return {
      url: `${this.baseUrl}/${url}`,
      method,
      headers,
    };
  }
}
