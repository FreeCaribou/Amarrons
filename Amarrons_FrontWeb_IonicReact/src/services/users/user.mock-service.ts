import { IUser } from "./user.interface-service";
import { FormatAxiosMock } from "../../utils/Utils";

export class UserMockService implements IUser {

  // exemple of token with name Samy and role simple user (code 1)
  returnToken = FormatAxiosMock({
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUmFvdWwiLCJyb2xlIjp7ImlkIjoxLCJjb2RlIjoiMSIsImxhYmVsIjoic2ltcGxlLXVzZXIifSwiaWQiOjIsImlhdCI6MTYxMTU4NjI2Nn0.2PJM2LSW9olDyS17yUPkgRex-aedP4TB6ZVgcKQLHUQ'
  });

  returnAdminToken = FormatAxiosMock({
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2FteSIsInJvbGUiOnsiaWQiOjMsImNvZGUiOiIzIiwibGFiZWwiOiJhZG1pbiJ9LCJpZCI6MSwiaWF0IjoxNjAwNzYwNTkxfQ.ZOjNaXCe79h9-9Ng3mAnNEAChmIM-DaWAPgDfBShjZ8'
  })

  Login = async (email: string, password: string) => {
    if (email === "samy@amarrons.com") {
      return this.returnAdminToken;
    }
    return this.returnToken;
  }

  SignUp = async (email: string, name: string, password: string) => {
    return this.returnToken;
  }

  VerifyRight = async (token: string, authorizedRoles: string[]) => {
    return FormatAxiosMock({ isAuthorized: true });
  }

}