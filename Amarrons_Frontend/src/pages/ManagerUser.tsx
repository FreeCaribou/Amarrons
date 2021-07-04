import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons, useIonViewDidEnter } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import VerifyRight from '../components/VerifyRight';
import { RouteComponentProps } from 'react-router';

const ManageUser: React.FC<RouteComponentProps> = ({ history }) => {
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
          <VerifyRight setIsOk={setIsOk} roles={['3']} history={history} />
          :
          <div>Hello for the management of user</div>
        }
      </IonContent>
    </IonPage>
  );
};

export default ManageUser;
