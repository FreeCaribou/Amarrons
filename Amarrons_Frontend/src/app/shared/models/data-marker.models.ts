import * as Leaflet from 'leaflet';

// custom marker to have data with it
export class DataMarker extends Leaflet.Marker {
  data: any;

  constructor(latLng: L.LatLngExpression, data: any, options?: L.MarkerOptions) {
    super(latLng, options);
    this.setData(data);
  }

  getData() {
    return this.data;
  }

  setData(data: any) {
    this.data = data;
  }
}
