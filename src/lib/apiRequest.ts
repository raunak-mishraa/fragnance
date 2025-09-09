import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "/api", // adjust if your API has a different base path
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic function
export async function apiRequest<T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> {
  try {
    const response = await api(url, config);
    return response.data as T;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "API request failed");
    }
    throw new Error(error.message || "Network error");
  }
}
