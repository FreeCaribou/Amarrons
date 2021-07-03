import { AxiosResponse } from "axios";
import { MarkerOption } from "../../models/marker-option.model";
import { MarkerType } from "../../models/marker-type.model";
import { Marker } from "../../models/marker.model";

export interface IMarker {
  GetMarkers(northEastLat: number, northEastLng: number, southWestLat: number, southWestLng: number): Promise<AxiosResponse<Marker[]>>;
  GetMarkerTypes(): Promise<AxiosResponse<MarkerType[]>>;
  CreateMarker(marker: Marker): Promise<AxiosResponse<Marker>>;
  GetMarkerOptions(): Promise<AxiosResponse<MarkerOption[]>>;
  GetOneMarker(id: string): Promise<AxiosResponse<Marker>>;
}