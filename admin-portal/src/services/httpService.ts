import axios from "axios";

export interface IHttpService {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: any): Promise<T>;
  put<T>(url: string, data: any): Promise<T>;
  delete<T>(url: string): Promise<T>;
}

class HttpService implements IHttpService {
  async get<T>(url: string): Promise<T> {
    const response = await axios.get<T>(url);
    return await response.data;
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response = await axios.post(url, data);
    return await response.data;
  }

  async put<T>(url: string, data: any): Promise<T> {
    const response = await axios.put(url, data);
    return await response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await axios.delete(url);
    return await response.data;
  }
}

export default HttpService;
