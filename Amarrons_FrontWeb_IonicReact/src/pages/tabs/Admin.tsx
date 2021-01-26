import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { navigateCircle, peopleCircle } from 'ionicons/icons';

// TODO security
const Admin: React.FC = () => {
  const { t } = useTranslation();

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar color="primary">
          <IonTitle>{t("Nav.Admin")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem className="fake-select-mouse">
            <IonIcon icon={navigateCircle} color="secondary" />
            <IonLabel className="margin-left-small">
              {t("Admin.ManageUnvalidatedMarker")}</IonLabel>
          </IonItem>
          <IonItem className="fake-select-mouse">
            <IonIcon icon={peopleCircle} color="secondary" />
            <IonLabel className="margin-left-small">
              {t("Admin.ManageUser")}
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Admin;