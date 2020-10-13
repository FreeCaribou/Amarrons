import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons, useIonViewDidEnter } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import * as Leaflet from 'leaflet';
import { createMap } from '../utils/Utils';
import { DataMarker } from '../models/data-marker.models';
import { useTranslation } from 'react-i18next';
import MarkerForm from './MarkerForm';

interface Props extends RouteComponentProps<{
  lat: string;
  lng: string;
  zoom: string;
  point: string; // 0 to say no we don't want to begin with marker - 1 to say yes
}> { }

// TODO can move (or create) the new point
const ManageMap: React.FC<Props> = ({ match, history }) => {

  const { t } = useTranslation();

  const [lat, setLat] = useState(+match.params.lat);
  const [lng, setLng] = useState(+match.params.lng);

  let map: Leaflet.Map;

  useIonViewDidEnter(() => {
    console.log(match);
    if (!map) {
      map = createMap("manageMapId", +match.params.lat, +match.params.lng, +match.params.zoom);
      if (match.params.point == '1') {
        const markPoint = new DataMarker([+match.params.lat, +match.params.lng], { id: 0 });
        markPoint.addTo(map);
      }
    }
  })

  const goBack = () => {
    history.goBack();
  }

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/map" />
          </IonButtons>
          {/* TODO different title in case of the situation */}
          <IonTitle>{t("Nav.ManageMap")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div id="manageMapId" className="map">
        </div>
      </IonContent>
      <IonContent>
        <MarkerForm position={{ lat, lng }} goBack={goBack} />
      </IonContent>
    </IonPage>
  );
};

export default ManageMap;
