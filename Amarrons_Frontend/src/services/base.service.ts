import Axios, { AxiosResponse } from "axios"

// TODO gestion of the api_key
export class BaseService {

  static get<T>(url: string): Promise<AxiosResponse<T>> {
    return Axios.get<T>(process.env.REACT_APP_API_URL + url, { headers: { user_token: localStorage.getItem('user_token') } });
  }

  static post<T>(url: string, body: any): Promise<AxiosResponse<T>> {
    return Axios.post<T>(process.env.REACT_APP_API_URL + url, body, { headers: { user_token: localStorage.getItem('user_token') } });
  }

  static delete<T>(url: string): Promise<AxiosResponse<T>> {
    return Axios.delete<T>(process.env.REACT_APP_API_URL + url, { headers: { user_token: localStorage.getItem('user_token') } });
  }

  static put<T>(url: string, body: any): Promise<AxiosResponse<T>> {
    return Axios.put<T>(process.env.REACT_APP_API_URL + url, body, { headers: { user_token: localStorage.getItem('user_token') } });
  }

}