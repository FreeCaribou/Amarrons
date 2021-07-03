import { IMarker } from "./marker.interface-service";
import { BaseService } from "../base.service";
import { AxiosResponse } from "axios";
import { MarkerType } from "../../models/marker-type.model";
import { Marker } from "../../models/marker.model";
import { MarkerOption } from "../../models/marker-option.model";

export class MarkerDataService implements IMarker {

  GetMarkers(northEastLat: number, northEastLng: number, southWestLat: number, southWestLng: number): Promise<AxiosResponse<Marker[]>> {
    return BaseService.get<Marker[]>(`markers?northEastLat=${northEastLat}&northEastLng=${northEastLng}&southWestLat=${southWestLat}&southWestLng=${southWestLng}`);
  }

  GetMarkerTypes(): Promise<AxiosResponse<MarkerType[]>> {
    return BaseService.get<MarkerType[]>(`markers/params/types`);
  }

  CreateMarker(marker: any): Promise<AxiosResponse<Marker>> {
    return BaseService.post(`markers`, marker);
  }

  GetMarkerOptions(): Promise<AxiosResponse<MarkerOption[]>> {
    return BaseService.get(`markers/params/options`);
  }

  GetOneMarker(id: string): Promise<AxiosResponse<Marker>> {
    return BaseService.get(`markers/${id}`);
  }
}