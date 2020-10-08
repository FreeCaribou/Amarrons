import { Marker } from "leaflet";

export interface IMarker {
  GetMarkers(northEastLat: number, northEastLng: number, southWestLat: number, southWestLng: number): any;
  GetMarkerTypes(): any;
  CreateMarker(marker: Marker): any;
  GetMarkerOptions(): any;
}