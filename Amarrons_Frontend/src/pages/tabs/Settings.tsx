import React, { useContext } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Settings.css';
import Login from '../../components/Login';
import ChangeLanguage from '../../components/ChangeLanguage';
import { useTranslation } from 'react-i18next';
import UserContext from '../../hooks/useUserContext';

const Settings: React.FC = () => {
  const { t } = useTranslation();

  const [user] = useContext(UserContext);

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar color="primary">
          <IonTitle>{t("Nav.Settings")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {user &&
          <div >
            <p className="padding-not-stick-edges">{t("General.HelloName", { name: user.name })}</p>
            <div className="separator"></div>
          </div>
        }
        <ChangeLanguage />
        <div className="separator"></div>
        <Login />
      </IonContent>
    </IonPage>
  );
};

export default Settings;
