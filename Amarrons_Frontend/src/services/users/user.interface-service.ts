import { AxiosResponse } from "axios";
import { User } from "../../models/user.model";

export interface IUser {
  Login(email: string, password: string): Promise<AxiosResponse<User>>;
  SignUp(email: string, name: string, password: string): Promise<AxiosResponse<User>>;
  VerifyRight(authorizedRoles: string[]): Promise<AxiosResponse<any>>;
  VerifyToken(): Promise<AxiosResponse<any>>;
}