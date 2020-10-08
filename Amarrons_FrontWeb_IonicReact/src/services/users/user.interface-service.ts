export interface IUser {
  Login(email: string, password: string): any;
  SignUp(email: string, name: string, password: string): any;
  VerifyRight(token: string, authorizedRoles: string[]): any;
}