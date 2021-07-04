import { IUser } from "./user.interface-service";
import { BaseService } from "../base.service";
import { AxiosResponse } from "axios";
import { User } from "../../models/user.model";

export class UserDataService implements IUser {

  Login(email: string, password: string): Promise<AxiosResponse<User>> {
    return BaseService.post<User>('users/login', { email, password });
  }

  SignUp(email: string, name: string, password: string): Promise<AxiosResponse<User>> {
    return BaseService.post<User>('users/signup', { email, password, name });
  }

  VerifyRight(authorizedRoles: string[]): Promise<AxiosResponse<any>> {
    return BaseService.get<any>(`users/verifyRight?token=${localStorage.getItem('user_token')}&authorizedRoles=${authorizedRoles.join()}`);
  }

  VerifyToken(): Promise<AxiosResponse<any>> {
    return BaseService.get<any>(`users/verifyToken`);
  }

}