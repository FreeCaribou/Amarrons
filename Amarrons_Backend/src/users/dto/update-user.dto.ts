import { IsNotEmpty, IsOptional } from "class-validator";
import { Role } from "../entities/role.entity";

export class UpdateUserDto {
  @IsOptional()
  readonly id: number;
  @IsOptional()
  readonly name: string;
  @IsOptional()
  readonly email: string;

  @IsNotEmpty()
  readonly role: Role;
}