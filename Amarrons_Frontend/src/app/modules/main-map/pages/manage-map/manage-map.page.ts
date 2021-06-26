import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as Leaflet from 'leaflet';
import { forkJoin } from 'rxjs';
import { createMap } from 'src/app/shared/map-utils';
import { DataMarker } from 'src/app/shared/models/data-marker.models';

import { ErrorCommunicationService } from 'src/app/shared/services/communication/error.communication.service';
import { FormCommunicationService } from 'src/app/shared/services/communication/form.communication.service';
import { LoaderCommunicationService } from 'src/app/shared/services/communication/loader.communication.service';
import { UserCommunicationService } from 'src/app/shared/services/communication/user.communication.service';
import { MarkerService } from 'src/app/shared/services/data/marker/marker.service';

@Component({
  selector: 'app-manage-map',
  templateUrl: 'manage-map.page.html',
})
export class ManageMapPage implements OnInit {
  // param for the activited route: lat / lng / zoom / point
  // if point is 0, don't create directly marker, if 1, create marker
  map: Leaflet.Map;
  currentPosition = { lat: 50.845001, lng: 4.349986 };

  markerForm: FormGroup;
  markerTypes;
  markerOptions;

  constructor(
    public markerService: MarkerService,
    public loaderCommunication: LoaderCommunicationService,
    public errorCommunication: ErrorCommunicationService,
    public userCommunication: UserCommunicationService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public formCommunication: FormCommunicationService,
  ) { }

  ngOnInit() {
    this.markerForm = this.formCommunication.buildMarkerForm();

    this.loaderCommunication.isLoading = true;
    forkJoin([
      this.markerService.getMarkerTypes(),
      this.markerService.getMarkerOptions()
    ]).subscribe(table => {
      console.log('table', table);
      this.markerTypes = table[0];
      this.markerOptions = table[1];
    }, error => {
      this.errorCommunication.throwError(error);
    }, () => {
      this.loaderCommunication.isLoading = false;
    });
  }

  ionViewWillEnter() {
    this.currentPosition = { lat: +this.activatedRoute.snapshot.paramMap.get("lat"), lng: +this.activatedRoute.snapshot.paramMap.get("lng") }
    if (!this.map) {
      this.map = createMap(
        "manageMapId",
        this.currentPosition.lat,
        this.currentPosition.lng,
        +this.activatedRoute.snapshot.paramMap.get("zoom"),
        null,
        null,
        null
      );

      if (this.activatedRoute.snapshot.paramMap.get("point") == '1') {
        const markPoint = new DataMarker([this.currentPosition.lat, this.currentPosition.lng], { id: 0 });
        markPoint.addTo(this.map);
      }
    }
  }

  onEdit() {
    console.log(this.markerForm);
  }


}