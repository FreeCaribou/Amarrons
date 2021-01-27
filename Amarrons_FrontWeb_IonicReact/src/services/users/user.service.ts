import { IUser } from "./user.interface-service";
import { UserDataService } from "./user.data-service";
import { UserMockService } from "./user.mock-service";

export class UserService implements IUser {

  userService = process.env.REACT_APP_NODE_ENV === 'production' ? new UserDataService() : new UserMockService();

  Login = async (email: string, password: string) => {
    return this.userService.Login(email, password);
  }

  SignUp = async (email: string, name: string, password: string) => {
    return await this.userService.SignUp(email, name, password);
  }

  VerifyRight = async (authorizedRoles: string[]) => {
    return await this.userService.VerifyRight(authorizedRoles);
  }

}