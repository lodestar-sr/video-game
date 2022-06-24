import axios, {AxiosRequestConfig, Method} from "axios";
import {CONFIG} from "../constants";

const http = axios.create({ baseURL: `${CONFIG.API_SERVER}/` });

const httpResponseHandler = (response) => {
  return response.data;
};

export class HttpService {
  static get(url: string, params: any = {}, headers: any = {}) {
    return HttpService.request('GET', url, { params, headers });
  }

  static post(url: string, body: any = {}, headers: any = {}) {
    return HttpService.request('POST', url, { data: body, headers });
  }

  static put(url: string, body: any = {}, headers: any = {}) {
    return HttpService.request('PUT', url, { data: body, headers });
  }

  static patch(url: string, body: any = {}, headers: any = {}) {
    return HttpService.request('PATCH', url, { data: body, headers });
  }

  static delete(url: string, body: any = {}, headers: any = {}) {
    return HttpService.request('DELETE', url, { data: body, headers });
  }

  static request(method: Method, url: string, options: AxiosRequestConfig): Promise<any> {
    return http
      .request({
        ...options,
        method,
        url,
      })
      .then(httpResponseHandler);
  };
}
