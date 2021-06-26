import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mock_get_all_markers, mock_get_marker_options, mock_get_marker_types } from './marker.mock';
import { IMarkerService } from './marker.service.interface';

@Injectable({
  providedIn: 'root'
})
export class MarkerMockDataService implements IMarkerService {

  getMarkers(northEastLat: number, northEastLng: number, southWestLat: number, southWestLng: number): Observable<any> {
    return of(mock_get_all_markers);
  }

  getMarkerTypes(): Observable<any> {
    return of(mock_get_marker_types);
  }

  createMarker(marker: any) {
    return of('');
  }

  getMarkerOptions() {
    return of(mock_get_marker_options);
  }

}