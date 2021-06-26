import { Component, Input, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { createMap } from 'src/app/shared/map-utils';
import { ErrorCommunicationService } from 'src/app/shared/services/communication/error.communication.service';
import { LoaderCommunicationService } from 'src/app/shared/services/communication/loader.communication.service';
import { MarkerService } from 'src/app/shared/services/data/marker/marker.service';

@Component({
  selector: 'app-main-map-show',
  templateUrl: './main-map-show.component.html',
  styleUrls: ['./main-map-show.component.scss'],
})
export class MainMapShowComponent implements OnInit {
  @Input()
  map: Leaflet.Map;

  constructor(
    public markerService: MarkerService,
    public loaderCommunication: LoaderCommunicationService,
    public errorCommunication: ErrorCommunicationService,
  ) { }

  ngOnInit() {

  }



}
