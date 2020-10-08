import Axios from "axios"

// TODO gestion of the api_key
export class BaseService {

  static async get(url: string) {
    return await Axios.get(process.env.REACT_APP_API_URL + url, { headers: { user_token: localStorage.getItem('user_token') } });
  }

  static async post(url: string, body: any) {
    return Axios.post(process.env.REACT_APP_API_URL + url, body, { headers: { user_token: localStorage.getItem('user_token') } });
  }

}