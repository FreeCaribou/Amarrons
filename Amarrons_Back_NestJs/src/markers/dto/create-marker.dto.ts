import { IsString, IsNumber, IsNotEmpty, IsOptional } from "class-validator";
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
}