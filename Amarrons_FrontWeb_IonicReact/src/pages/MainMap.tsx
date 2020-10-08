import React, { useEffect, useContext, useState } from 'react';
import { IonContent, IonFab, IonFabButton, IonIcon, IonPage, IonToast, useIonViewWillEnter } from '@ionic/react';
import * as Leaflet from 'leaflet';
import './MainMap.css';
import { DataMarker } from '../models/data-marker.models';
import { MarkerService } from '../services/markers/marker.service';
import UserContext from '../hooks/useUserContext';
import { RouteComponentProps } from 'react-router';
import { createMap } from '../utils/Utils';
import { useTranslation } from 'react-i18next';
import { sync } from 'ionicons/icons';

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

  let map: Leaflet.Map;
  const markerService = new MarkerService();

  let userToken: any;

  const [showToast, setShowToast] = useState(false);
  // I want a special loader just for the map
  const [showMapLoader, setShowMapLoader] = useState(false);

  const [user] = useContext(UserContext);

  useEffect(() => {
    console.log('hello', user);
  }, [user]);

  useIonViewWillEnter(() => {
    console.log('ion enter')
    if (!map) { loadMap(); }
    else { loadMarker(); }

    // the useContext did'nt work for the 'js' part of component
    // but I need to have the change for the onMapLongClick event
    // I don't like this solution...
    const token = localStorage.getItem('user_token');
    if (token) {
      userToken = token;
    } else {
      userToken = null;
    }
  });

  const loadMap: any = () => {
    console.log('init map', map);
    map = createMap(
      "mapId",
      50.840181,
      4.394504,
      13,
      (e: any) => { onMapClick(e); },
      (e: any) => { onMapMove(e); },
      (e: any) => { onMapLongClick(e) }
    );

    loadMarker();
  }

  const loadMarker: any = async () => {
    console.log('load the markers', map);
    const bounds = map.getBounds();
    console.log('bounds', bounds, bounds.getNorthEast(), bounds.getSouthWest());

    // must delete the old marker (but not the tileLayer!)
    map.eachLayer(function (layer) {
      console.log('one of the layer', layer, layer.getPopup());
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
        markPoint.bindPopup(`<p>${e.label}</p>`);
        markPoint.on('click', (e: any) => { onMarkerClick(e); });
        markPoint.addTo(map);
      })
    }).catch((error: any) => {
      // TODO must think of a different way to show potentiel error message for the map
    }).finally(() => {
      setShowMapLoader(false);
    });
  }

  const onMapClick: any = (e: any) => {
    console.log('click', e);
  }

  const onMapLongClick: any = (e: any) => {

    console.log('long click', e);
    console.log('user?', userToken);
    if (userToken) {
      history.push(`/map/new-marker/${e.latlng.lat}/${e.latlng.lng}/${map.getZoom()}`);
    } else {
      setShowToast(true);
      history.push(`/options`);
    }
  }

  const onMapMove: any = (e: any) => {
    console.log('move', e);
    loadMarker();
  }

  const onMarkerClick: any = (e: any) => {
    console.log(`click marker ${e.target.data.id}`, e);
  }

  return (
    <IonPage>

      {/* <IonHeader translucent={true}>
        <IonToolbar color="primary">
          <IonTitle>{t("Nav.MainMap")}</IonTitle>
        </IonToolbar>
      </IonHeader> */}

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
