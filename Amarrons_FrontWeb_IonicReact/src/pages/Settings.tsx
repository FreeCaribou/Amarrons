import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Settings.css';
import Login from '../components/Login';
import ChangeLanguage from '../components/ChangeLanguage';
import { useTranslation } from 'react-i18next';

const Settings: React.FC = () => {
  const { t } = useTranslation();

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar color="primary">
          <IonTitle>{t("Nav.Settings")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ChangeLanguage />
      </IonContent>
      <IonContent>
        <Login />
      </IonContent>
    </IonPage>
  );
};

export default Settings;
