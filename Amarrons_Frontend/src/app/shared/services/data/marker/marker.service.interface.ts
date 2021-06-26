import { Observable } from "rxjs";

export interface IMarkerService {
  getMarkers(northEastLat: number, northEastLng: number, southWestLat: number, southWestLng: number): Observable<any>;
  getMarkerTypes(): Observable<any>;
  createMarker(marker: any): Observable<any>;
  getMarkerOptions(): Observable<any>;
}