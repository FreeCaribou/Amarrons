import { IsString, IsNumber, IsNotEmpty } from "class-validator";
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
}