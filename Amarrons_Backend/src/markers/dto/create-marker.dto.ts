import { IsString, IsNumber, IsNotEmpty, IsOptional } from "class-validator";
import { User } from "../../users/entities/user.entity";
import { MarkerOption } from "../entities/marker-option.entity";
import { MarkerType } from "../entities/marker-type.entity";

export class CreateMarkerDto {
  @IsString()
  readonly label: string;

  @IsNumber()
  readonly lat: number;

  @IsNumber()
  readonly lng: number;

  @IsNotEmpty()
  readonly markerType: MarkerType;

  @IsOptional()
  readonly markerOptions: MarkerOption[];

  @IsOptional()
  suggestedBy: User;

  @IsOptional()
  validatedBy: User;
}