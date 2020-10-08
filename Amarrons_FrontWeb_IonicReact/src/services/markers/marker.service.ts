import { MarkerMockService } from "./marker.mock-service";
import { MarkerDataService } from "./marker.data-service";
import { IMarker } from "./marker.interface-service";

export class MarkerService implements IMarker {
  markerService = process.env.REACT_APP_NODE_ENV === 'production' ? new MarkerDataService() : new MarkerMockService();

  GetMarkers = async (northEastLat: number, northEastLng: number, southWestLat: number, southWestLng: number) => {
    return await this.markerService.GetMarkers(northEastLat, northEastLng, southWestLat, southWestLng);
  }

  GetMarkerTypes = async () => {
    return await this.markerService.GetMarkerTypes();
  }

  CreateMarker = async (marker: any) => {
    return await this.markerService.CreateMarker(marker);
  }

  GetMarkerOptions = async () => {
    return await this.markerService.GetMarkerOptions();
  }
}