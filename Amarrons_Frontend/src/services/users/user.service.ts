import { IUser } from "./user.interface-service";
import { UserDataService } from "./user.data-service";
import { UserMockService } from "./user.mock-service";
import { AxiosResponse } from "axios";
import { User } from "../../models/user.model";

export class UserService implements IUser {

  userService = process.env.REACT_APP_NODE_ENV === 'production' ? new UserDataService() : new UserMockService();

  Login(email: string, password: string): Promise<AxiosResponse<User>> {
    return this.userService.Login(email, password);
  }

  SignUp(email: string, name: string, password: string): Promise<AxiosResponse<User>> {
    return this.userService.SignUp(email, name, password);
  }

  VerifyRight(authorizedRoles: string[]): Promise<AxiosResponse<any>> {
    return this.userService.VerifyRight(authorizedRoles);
  }

  VerifyToken(): Promise<AxiosResponse<any>> {
    return this.userService.VerifyToken();
  }

}