import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { IMarkerService } from './marker.service.interface';

@Injectable({
  providedIn: 'root'
})
export class MarkerDataService implements IMarkerService {
  baseUrl = 'markers';

  constructor(public baseService: BaseService) { }

  getMarkers(northEastLat: number, northEastLng: number, southWestLat: number, southWestLng: number): Observable<any> {
    return this.baseService.get(`${this.baseUrl}?northEastLat=${northEastLat}&northEastLng=${northEastLng}&southWestLat=${southWestLat}&southWestLng=${southWestLng}`);
  }

  getMarkerTypes(): Observable<any> {
    return this.baseService.get(`${this.baseUrl}/types`);
  }

  createMarker(marker: any): Observable<any> {
    return this.baseService.post(`${this.baseUrl}`, marker);
  }

  getMarkerOptions(): Observable<any> {
    return this.baseService.get(`${this.baseUrl}/options`);
  }


}