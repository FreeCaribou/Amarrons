import React, { useContext, useState } from 'react';
import { IonContent, IonFab, IonFabButton, IonIcon, IonPage, IonToast, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import * as Leaflet from 'leaflet';
import './MainMap.css';
import { DataMarker } from '../../models/data-marker.models';
import { MarkerService } from '../../services/markers/marker.service';
import UserContext from '../../hooks/useUserContext';
import { RouteComponentProps } from 'react-router';
import { createMap } from '../../utils/Utils';
import { useTranslation } from 'react-i18next';
import { add, locate, sync } from 'ionicons/icons';
import { Plugins } from '@capacitor/core';
import { Geolocation } from '@ionic-native/geolocation';
import ErrorMessageContext from '../../hooks/useErrorMessageContext';

// TODO find an artist for better icon
let anchorIcon = Leaflet.icon({
  iconUrl: '../../assets/icon/anchor-icon.png',
  iconSize: [50, 50], // size of the icon
});

let spyglassIcon = Leaflet.icon({
  iconUrl: '../../assets/icon/spyglass-icon.png',
  iconSize: [50, 50], // size of the icon
});

const MainMap: React.FC<RouteComponentProps> = ({ history }) => {

  const { t } = useTranslation();

  // The Manneken Pis position as default (don't ask me why...)
  let currentPosition = { lat: 50.845001, lng: 4.349986 };
  let map: Leaflet.Map = null as any;
  const [stateMap, setStateMap] = useState(map);
  const markerService = new MarkerService();

  let userToken: any;

  const [showToast, setShowToast] = useState(false);
  // I want a special loader just for the map
  const [showMapLoader, setShowMapLoader] = useState(false);

  const [user] = useContext(UserContext);
  const [, setErrorMessage] = useContext(ErrorMessageContext);

  let wait = '';

  useIonViewWillEnter(() => {
    setShowMapLoader(true);
    let positionWait: any;
    Geolocation.getCurrentPosition().then(data => {
      positionWait = data;
    }).catch(error => {
    }).finally(() => {
      if (positionWait) {
        currentPosition = { lat: positionWait.coords.latitude, lng: positionWait.coords.longitude };
        updatePositionMarker();
      }

      if (!map) { loadMap(); }
      else { setStateMap(map); loadMarker(); }

      const token = localStorage.getItem('user_token');
      if (token) {
        userToken = token;
      } else {
        userToken = null;
      }

      watchPositionChange();
    });

  });

  useIonViewWillLeave(() => {
    // Stop the watching position (thanks for the battery)
    Plugins.Geolocation.clearWatch({ id: wait });
  })

  const loadMap: any = async () => {
    map = createMap(
      "mapId",
      currentPosition.lat,
      currentPosition.lng,
      15,
      null,
      (e: any) => { onMapMove(e); },
      (e: any) => { onMapLongClick(e) }
    );

    setStateMap(map);
    loadMarker();
  }

  const loadMarker: any = async () => {
    const bounds = map.getBounds();
    // must delete the old marker (but not the tileLayer!)
    map.eachLayer(function (layer) {
      if (layer.getPopup()) {
        map.removeLayer(layer);
      }
    });

    setShowMapLoader(true);
    // now we can load the new marker from the backend
    markerService.GetMarkers(bounds.getNorthEast().lat, bounds.getNorthEast().lng, bounds.getSouthWest().lat, bounds.getSouthWest().lng).then(data => {
      // form the marker on the map
      data.data.forEach((e: any) => {
        let icon;
        switch (e.markerType.code) {
          case '1':
            icon = anchorIcon;
            break;
          case '2':
            icon = spyglassIcon;
            break;
        }
        const markPoint = new DataMarker([e.lat, e.lng], { id: e.id }, { icon: icon });
        // TODO better pop-up with the option
        markPoint.bindPopup(`<p>${e.label}</p>`);
        markPoint.on('contextmenu', (e: any) => { onMarkerLongClick(e) });
        markPoint.addTo(map);
      });
      setStateMap(map);
    }).catch((error: any) => {
      setErrorMessage(error.response);
    }).finally(() => {
      setShowMapLoader(false);
    });
  }

  const watchPositionChange: any = async () => {
    wait = Plugins.Geolocation.watchPosition({ enableHighAccuracy: true }, async (position, error) => {
      compareOldAndNewPosition(position, error);
    });
  }

  const compareOldAndNewPosition: any = async (position: any) => {
    const newPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
    if (currentPosition !== newPosition) {
      currentPosition = newPosition;
      updatePositionMarker();
    }
  }

  // TODO make a more relevant marker for the user position
  const updatePositionMarker: any = () => {
    if (map) {
      // delete the old user position marker
      map.eachLayer(function (layer: any) {
        if (layer.data && layer.data.userPosition) {
          map.removeLayer(layer);
        }
      });

      const markPoint = new DataMarker([currentPosition.lat, currentPosition.lng], { userPosition: true });
      markPoint.addTo(map);
      setStateMap(map);
    }
  }

  const onMapLongClick: any = (e: any) => {
    if (userToken) {
      history.push(`/map/new-marker/${e.latlng.lat}/${e.latlng.lng}/${map.getZoom()}/1`);
    } else {
      setShowToast(true);
      history.push(`/options`);
    }
  }

  const onMapMove: any = (e: any) => {
    loadMarker();
  }

  // TODO with some role, do some thing, go tu update mode
  const onMarkerLongClick: any = (e: any) => {
    console.log(`long click marker ${e.target.data.id} to modify if right role`, e);
  }

  const onGpsFabClick: any = () => {
    let positionWait;
    setShowMapLoader(true);
    Geolocation.getCurrentPosition().then(data => {
      positionWait = data;
      compareOldAndNewPosition(positionWait);
      stateMap.panTo([positionWait.coords.latitude, positionWait.coords.longitude]);
    }).catch(error => {
    }).finally(() => {
      setShowMapLoader(false);
    });
  }

  return (
    <IonPage>

      <IonContent>
        <div id="mapId" className="map" slot="fixed">
        </div>

        {
          showMapLoader &&
          <IonFab className="map-loader" vertical="top" horizontal="end" slot="fixed">
            <IonFabButton disabled={true}>
              <IonIcon icon={sync} color={'secondary'} />
            </IonFabButton>
          </IonFab>
        }

        {
          user &&
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton
              onClick={(e) =>
                history.push(`/map/new-marker/${stateMap.getCenter().lat}/${stateMap.getCenter().lng}/${stateMap.getZoom()}/0`)}
            >
              <IonIcon icon={add} color={'secondary'} />
            </IonFabButton>
          </IonFab>
        }

        <IonFab vertical="bottom" horizontal="start" slot="fixed">
          <IonFabButton onClick={() => onGpsFabClick()}>
            <IonIcon icon={locate} color={'secondary'} />
          </IonFabButton>
        </IonFab>

      </IonContent>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={t("Error.NoConnectedOrRole")}
        duration={3000}
      />

    </IonPage>
  );
};

export default MainMap;
