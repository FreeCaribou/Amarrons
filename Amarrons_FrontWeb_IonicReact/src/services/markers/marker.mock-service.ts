import { FormatAxiosMock } from "../../utils/Utils"
import { IMarker } from "./marker.interface-service";

export class MarkerMockService implements IMarker {

  GetMarkers = async (northEastLat: number, northEastLng: number, southWestLat: number, southWestLng: number) => {
    return FormatAxiosMock([
      {
        id: 1,
        label: "Cinquantenaire",
        lat: 50.840255,
        lng: 4.394491,
        markerType: {
          id: 1,
          code: "1",
          label: "Port"
        }
      },
      {
        id: 2,
        label: "Le Berlaymont",
        lat: 50.843725,
        lng: 4.382375,
        markerType: {
          id: 2,
          code: "2",
          label: "View"
        }
      }
    ]);
  }

  GetMarkerTypes = async () => {
    return FormatAxiosMock([
      {
        id: 1,
        code: '1',
        label: 'Port'
      },
      {
        id: 2,
        code: '2',
        label: 'View'
      }
    ]);
  }

  CreateMarker = async (marker: any) => {
    return FormatAxiosMock({ todo: 'TODO' })
  }

  GetMarkerOptions = async () => {
    return FormatAxiosMock([
      {
        id: 1,
        code: '1',
        label: 'Water supply'
      },
      {
        id: 2,
        code: '2',
        label: 'Electricity supply'
      }
    ]);
  }

}