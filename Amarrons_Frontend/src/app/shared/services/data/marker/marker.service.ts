import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarkerDataService } from './marker.data.service';
import { IMarkerService } from './marker.service.interface';

@Injectable({
  providedIn: 'root'
})
export class MarkerService implements IMarkerService {
  constructor(public service: MarkerDataService) { }

  getMarkers(northEastLat: number, northEastLng: number, southWestLat: number, southWestLng: number): Observable<any> {
    return this.service.getMarkers(northEastLat, northEastLng, southWestLat, southWestLng);
  }

  getMarkerTypes(): Observable<any> {
    return this.service.getMarkerTypes();
  }

  createMarker(marker: any): Observable<any> {
    return this.service.createMarker(marker);
  }

  getMarkerOptions(): Observable<any> {
    return this.service.getMarkerOptions();
  }

}