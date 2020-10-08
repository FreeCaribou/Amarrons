import { IMarker } from "./marker.interface-service";
import { BaseService } from "../base.service";

export class MarkerDataService implements IMarker {

  GetMarkers = async (northEastLat: number, northEastLng: number, southWestLat: number, southWestLng: number) => {
    return await BaseService.get(`markers?northEastLat=${northEastLat}&northEastLng=${northEastLng}&southWestLat=${southWestLat}&southWestLng=${southWestLng}`);
  }

  GetMarkerTypes = async () => {
    return await BaseService.get(`markers/types`);
  }

  CreateMarker = async (marker: any) => {
    return await BaseService.post(`markers`, marker);
  }

  GetMarkerOptions = async () => {
    return await BaseService.get(`markers/options`);
  }
}