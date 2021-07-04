import { MarkerOption } from "./marker-option.model";
import { MarkerType } from "./marker-type.model";

export class Marker {

  id!: number;
  label!: string;
  lat!: number;
  lng!: number;
  markerType!: MarkerType;
  markerOptions!: MarkerOption[]

}