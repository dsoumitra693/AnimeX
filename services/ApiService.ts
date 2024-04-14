import axios, { AxiosResponse } from "axios";
import { RequestOptionsBuilder } from "../utils/RequestOptionsBuilder";

const BASE_URL = 'https://consumet-ts-two.vercel.app/meta/anilist/'


export class ApiService {
  private static instance: ApiService;
  private requestOptionsBuilder: RequestOptionsBuilder;

  private constructor(requestOptionsBuilder: RequestOptionsBuilder) {
    this.requestOptionsBuilder = requestOptionsBuilder;
  }

  static getInstance(baseUrl: string): ApiService {
    if (!ApiService.instance) {
      const requestOptionsBuilder = RequestOptionsBuilder.getInstance(baseUrl);
      ApiService.instance = new ApiService(requestOptionsBuilder);
    }
    return ApiService.instance;
  }

  async request<T>(url: string, method: string, headers: Record<string, string> = {}): Promise<AxiosResponse<T>> {
    try {
      const requestOptions = this.requestOptionsBuilder.buildRequestOptions(url, method, headers);
      console.log(requestOptions)
      const response = await axios.request<T>(requestOptions);
      return response;
    } catch (error:any) {
      console.error("Error:", error);
      throw new Error(error);
    }
  }
}

export const apiService = ApiService.getInstance(BASE_URL);
