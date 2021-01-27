import { IUser } from "./user.interface-service";
import { BaseService } from "../base.service";

export class UserDataService implements IUser {

  Login = async (email: string, password: string) => {
    return BaseService.post('users/login', { email, password });
  }

  SignUp = async (email: string, name: string, password: string) => {
    return await BaseService.post('users/signup', { email, password, name });
  }

  VerifyRight = async (authorizedRoles: string[]) => {
    return await BaseService.get(`users/verifyRight?token=${localStorage.getItem('user_token')}&authorizedRoles=${authorizedRoles.join()}`);
  }

}