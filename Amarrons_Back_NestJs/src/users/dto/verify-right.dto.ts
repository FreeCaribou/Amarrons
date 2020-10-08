import { IsNotEmpty } from "class-validator";

export class VerifyRightDto {
  @IsNotEmpty()
  readonly token: string;
  // must be a string with , to split the allowed roles
  @IsNotEmpty()
  readonly authorizedRoles: string;
}