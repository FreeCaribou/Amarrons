import { IUser } from "./user.interface-service";
import { FormatAxiosMock } from "../../utils/Utils";

export class UserMockService implements IUser {

  adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2FteSIsInJvbGUiOnsiaWQiOjMsImNvZGUiOiIzIiwibGFiZWwiOiJhZG1pbiJ9LCJpZCI6MSwiaWF0IjoxNjAwNzYwNTkxfQ.ZOjNaXCe79h9-9Ng3mAnNEAChmIM-DaWAPgDfBShjZ8'

  // exemple of token with name Raoul and role simple user (code 1)
  returnToken = FormatAxiosMock({
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUmFvdWwiLCJyb2xlIjp7ImlkIjoxLCJjb2RlIjoiMSIsImxhYmVsIjoic2ltcGxlLXVzZXIifSwiaWQiOjIsImlhdCI6MTYxMTU4NjI2Nn0.2PJM2LSW9olDyS17yUPkgRex-aedP4TB6ZVgcKQLHUQ'
  });

  // exemple of token with name Samy and role admin (code 3)
  returnAdminToken = FormatAxiosMock({
    token: this.adminToken
  });

  // exemple of token with name Rosa and role modo (code 2)
  returnModoToken = FormatAxiosMock({
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUm9zYSIsInJvbGUiOnsiaWQiOjIsImNvZGUiOiIyIiwibGFiZWwiOiJtb2RvIn0sImlkIjozLCJpYXQiOjE2MDA3NjA1OTF9.yZBWmQY6b9rEdLqcsUnes8-dVVt3Yy5G3iCUXiHNt1c'
  })

  Login = async (email: string, password: string) => {
    if (email === "samy@amarrons.com") {
      return this.returnAdminToken;
    } else if (email === "rluxemburg@amarrons.com") {
      return this.returnModoToken;
    }
    return this.returnToken;
  }

  SignUp = async (email: string, name: string, password: string) => {
    return this.returnToken;
  }

  VerifyRight = async (authorizedRoles: string[]) => {
    return FormatAxiosMock({ isAuthorized: true });
  }

  VerifyToken = async () => {
    return FormatAxiosMock({
      isValid: true,
      token: this.adminToken
    });
  }

}