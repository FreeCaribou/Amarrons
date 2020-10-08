import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import { useTranslation } from 'react-i18next';

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
        TODO
      </IonContent>
    </IonPage>
  )
}

export default Admin;