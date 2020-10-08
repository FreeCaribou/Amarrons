import { IsNotEmpty, IsNumber } from 'class-validator';

export class MarkerPositionSearchDto {
  @IsNumber()
  northEastLat: number;
  @IsNumber()
  northEastLng: number;
  @IsNumber()
  southWestLat: number;
  @IsNumber()
  southWestLng: number;
}