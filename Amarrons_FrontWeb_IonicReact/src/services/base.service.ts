import Axios from "axios"

// TODO gestion of the api_key
export class BaseService {

  static get(url: string) {
    return Axios.get(process.env.REACT_APP_API_URL + url, { headers: { user_token: localStorage.getItem('user_token') } });
  }

  static post(url: string, body: any) {
    return Axios.post(process.env.REACT_APP_API_URL + url, body, { headers: { user_token: localStorage.getItem('user_token') } });
  }

}