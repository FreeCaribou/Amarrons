export interface IUserService {
  login(user): any;
  signUp(user): any;
  verifyRight(authorizedRoles: string[]): any;
  verifyToken(): any;
}