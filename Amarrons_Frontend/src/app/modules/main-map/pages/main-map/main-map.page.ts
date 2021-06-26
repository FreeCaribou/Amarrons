import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as Leaflet from 'leaflet';
import { createMap } from 'src/app/shared/map-utils';
import { DataMarker } from 'src/app/shared/models/data-marker.models';
import { MarkerTypeEnum } from 'src/app/shared/models/enum/marker-type.enum';
import { ErrorCommunicationService } from 'src/app/shared/services/communication/error.communication.service';
import { LoaderCommunicationService } from 'src/app/shared/services/communication/loader.communication.service';
import { UserCommunicationService } from 'src/app/shared/services/communication/user.communication.service';
import { MarkerService } from 'src/app/shared/services/data/marker/marker.service';

import { Geolocation } from '@ionic-native/geolocation';
import { Plugins } from '@capacitor/core';

// TODO find an artist for better icon
let anchorIcon = Leaflet.icon({
  iconUrl: '../../assets/icon/anchor-icon.png',
  iconSize: [50, 50], // size of the icon
});

let spyglassIcon = Leaflet.icon({
  iconUrl: '../../assets/icon/spyglass-icon.png',
  iconSize: [50, 50], // size of the icon
});

@Component({
  selector: 'app-main-map',
  templateUrl: 'main-map.page.html',
})
export class MainMapPage {
  map: Leaflet.Map;
  currentPosition = { lat: 50.845001, lng: 4.349986 };
  wait;

  constructor(
    public markerService: MarkerService,
    public loaderCommunication: LoaderCommunicationService,
    public errorCommunication: ErrorCommunicationService,
    public userCommunication: UserCommunicationService,
    public router: Router
  ) { }

  ionViewWillEnter() {
    let position;

    // TODO the permission
    Geolocation.getCurrentPosition().then(data => {
      console.log('geo position', data);
      position = data;
    }).then(error => {

    }).finally(() => {
      if (position) {
        this.currentPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
        this.updatePositionMarker();
      }

      if (!this.map) {
        this.initMap();
        if (position) {
          this.updatePositionMarker();
        }
      } else {
        this.loadMarker();
      }
    })
  }

  useIonViewWillLeave() {
    // Stop the watching position (thanks for the battery)
    Plugins.Geolocation.clearWatch({ id: this.wait });
  }

  initMap() {
    this.map = createMap(
      "mainMapId",
      this.currentPosition.lat,
      this.currentPosition.lng,
      15,
      null,
      (e: any) => { this.onMapMove(e); },
      (e: any) => { this.onMapLongClick(e) }
    );

    this.loadMarker();
  }

  loadMarker() {
    this.loaderCommunication.isLoading = true;
    const bounds = this.map.getBounds();

    this.map.eachLayer((layer) => {
      if (layer.getPopup()) {
        this.map.removeLayer(layer);
      }
    });

    this.markerService.getMarkers(
      bounds.getNorthEast().lat,
      bounds.getNorthEast().lng,
      bounds.getSouthWest().lat,
      bounds.getSouthWest().lng)
      .subscribe(data => {
        console.log(data);

        data.forEach((e) => {
          let icon;
          switch (e.markerType.code) {
            case MarkerTypeEnum.Port:
              icon = anchorIcon;
              break;
            case MarkerTypeEnum.View:
              icon = spyglassIcon;
              break;
          }

          const markPoint = new DataMarker([e.lat, e.lng], { id: e.id }, { icon: icon });
          // TODO better pop-up with the option
          markPoint.bindPopup(`<p onClick={console.log(${e.label})} >${e.label}</p>`);
          markPoint.on('contextmenu', (e: any) => { this.onMarkerLongClick(e) });
          markPoint.addTo(this.map);
        })

      }, error => {
        this.errorCommunication.throwError(error);
      }, () => {
        this.loaderCommunication.isLoading = false;
      });
  }

  // TODO
  onMarkerLongClick(e) {
    console.log(`long click marker ${e.target.data.id} to modify if right role`, e);
  }

  onMapMove(e) {
    this.loadMarker();
  }

  onMapLongClick(e: any) {
    console.log(this.userCommunication.isConnected())
    if (this.userCommunication.isConnected()) {
      console.log('go to create a new marker');
      this.router.navigate(['tabs', 'main-map', 'manage-map', e.latlng.lat, e.latlng.lng, this.map.getZoom(), '1']);
      // history.push(`/main-map/new-marker/${e.latlng.lat}/${e.latlng.lng}/${this.map.getZoom()}/1`);
    } else {
      this.router.navigate(['tabs', 'settings']);
    }
  }

  // TODO make a more relevant marker for the user position
  updatePositionMarker() {
    if (this.map) {
      // delete the old user position marker
      this.map.eachLayer((layer: any) => {
        if (layer.data && layer.data.userPosition) {
          this.map.removeLayer(layer);
        }
      });

      const markPoint = new DataMarker([this.currentPosition.lat, this.currentPosition.lng], { userPosition: true });
      markPoint.addTo(this.map);
    }
  }

  async watchPositionChange() {
    this.wait = Plugins.Geolocation.watchPosition({ enableHighAccuracy: true }, async (position, error) => {
      this.compareOldAndNewPosition(position);
    });
  }

  async compareOldAndNewPosition(position: any) {
    const newPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
    if (this.currentPosition !== newPosition) {
      this.currentPosition = newPosition;
      this.updatePositionMarker();
    }
  }

}
