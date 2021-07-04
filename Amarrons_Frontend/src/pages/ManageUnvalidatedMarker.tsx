import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons, useIonViewDidEnter } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { useTranslation } from 'react-i18next';
import VerifyRight from '../components/VerifyRight';

const ManageUnvalidatedMarker: React.FC<RouteComponentProps> = ({ history }) => {
  const { t } = useTranslation();

  const [isOk, setIsOk] = useState(false);

  useIonViewDidEnter(() => {

  });

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/admin" />
          </IonButtons>
          <IonTitle>{t("Nav.Admin")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {!isOk
          ?
          <VerifyRight setIsOk={setIsOk} roles={['2', '3']} history={history} />
          :
          <div>Hello for the management of map</div>
        }
      </IonContent>
    </IonPage>
  );
};

export default ManageUnvalidatedMarker;
