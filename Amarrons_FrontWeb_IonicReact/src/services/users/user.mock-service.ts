import { IUser } from "./user.interface-service";
import { FormatAxiosMock } from "../../utils/Utils";

export class UserMockService implements IUser {

  // exemple of token with name Samy and role simple user (code 1)
  returnToken = FormatAxiosMock({
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2FteSIsInJvbGUiOnsiaWQiOjEsImNvZGUiOiIxIiwibGFiZWwiOiJzaW1wbGUtdXNlciJ9LCJpZCI6MSwiaWF0IjoxNTk5NDYyNjI3fQ.L4dWJPmQYDkiBcUn940FIzDBCIoQ0MePP3Eh-GY2akM'
  });

  Login = async (email: string, password: string) => {
    return this.returnToken;
  }

  SignUp = async (email: string, name: string, password: string) => {
    return this.returnToken;
  }

  VerifyRight = async (token: string, authorizedRoles: string[]) => {
    return FormatAxiosMock({ isAuthorized: true });
  }

}