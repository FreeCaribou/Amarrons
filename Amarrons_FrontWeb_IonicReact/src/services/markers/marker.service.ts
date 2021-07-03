import { MarkerMockService } from "./marker.mock-service";
import { MarkerDataService } from "./marker.data-service";
import { IMarker } from "./marker.interface-service";
import { AxiosResponse } from "axios";
import { MarkerType } from "../../models/marker-type.model";
import { Marker } from "../../models/marker.model";
import { MarkerOption } from "../../models/marker-option.model";

export class MarkerService implements IMarker {
  markerService = process.env.REACT_APP_NODE_ENV === 'production' ? new MarkerDataService() : new MarkerMockService();

  GetMarkers(northEastLat: number, northEastLng: number, southWestLat: number, southWestLng: number): Promise<AxiosResponse<Marker[]>> {
    return this.markerService.GetMarkers(northEastLat, northEastLng, southWestLat, southWestLng);
  }

  GetMarkerTypes(): Promise<AxiosResponse<MarkerType[]>> {
    return this.markerService.GetMarkerTypes();
  }

  CreateMarker(marker: any): Promise<AxiosResponse<Marker>> {
    return this.markerService.CreateMarker(marker);
  }

  GetMarkerOptions(): Promise<AxiosResponse<MarkerOption[]>> {
    return this.markerService.GetMarkerOptions();
  }

  GetOneMarker(id: string): Promise<AxiosResponse<Marker>> {
    return this.markerService.GetOneMarker(id);
  }

  DeleteOneMarker(id: string): Promise<AxiosResponse<Marker>> {
    return this.markerService.DeleteOneMarker(id);
  }

  UpdateMarker(marker: any, id: string): Promise<AxiosResponse<Marker>> {
    return this.markerService.UpdateMarker(marker, id);
  }
}