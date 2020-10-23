import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLoading,
  IonToast,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { map, settings, peopleCircle } from 'ionicons/icons';
import { getPlatforms } from '@ionic/react';

import MainMap from './pages/MainMap';
import Settings from './pages/Settings';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import './App.css'
import UserContext from './hooks/useUserContext';
import LanguageContext from './hooks/useLanguageContext';

import { useTranslation } from 'react-i18next';
import ManageMap from './components/ManageMap';
import LoaderContext from './hooks/useLoaderContext';
import ErrorMessageContext from './hooks/useErrorMessageContext';
import Admin from './pages/Admin';
import { decodeJwt } from './utils/Utils';

const App: React.FC = () => {

  require('dotenv').config();

  const { t, i18n } = useTranslation();

  const [user, setUser] = useState(localStorage.getItem('user_token'));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null as any);
  const [currentLanguage, setCurrentLanguage] = useState('en' as any);

  // en, fr, de only for the moment because of the target audience
  // nl, no come later
  const [acceptedLanguage] = useState(['en', 'fr', 'de']);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userDecoded, setUserDecoded] = useState(null as any);

  useEffect(() => {
    const localLng = localStorage.getItem('lng');
    if (localLng) {
      setCurrentLanguage(localLng);
    } else {
      let userLang = navigator.language;
      userLang = userLang.slice(0, 2);
      setCurrentLanguage(userLang);
    }
  }, []);

  useEffect(() => {
    const decoded = async () => {
      if (user) {
        var jwt = require('jsonwebtoken');
        const token = await jwt.decode(localStorage.getItem('user_token'));
        setUserDecoded(token);
      } else {
        setUserDecoded(null);
      }
    }
    decoded();
  }, [user]);

  useEffect(() => {
    changeLanguage(currentLanguage);
  }, [currentLanguage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (error) {
      if (error.data && error.data.message) {
        const message = error.data.message;
        if (!Array.isArray(message)) {
          setErrorMessage(message as string);
        } else {
          // so it's an array
          let messageArray = '';
          message.forEach((e: string) => {
            messageArray += e + '\n';
          })
          setErrorMessage(messageArray);
        }
      } else {
        setErrorMessage('There is an error');
      }
      setShowErrorToast(true);
    }
  }, [error])

  const changeLanguage: any = (lng: string) => {
    if (acceptedLanguage.find(x => x === lng)) {
      i18n.changeLanguage(lng);
      localStorage.setItem('lng', currentLanguage);
    }
  }

  const isAdmin: any = () => {
    if (userDecoded) {
      return userDecoded.role.code == '3';
    } else {
      return false;
    }
  }

  return (
    <UserContext.Provider value={[user, setUser]}>
      <LanguageContext.Provider value={[currentLanguage, setCurrentLanguage]}>
        <LoaderContext.Provider value={[isLoading, setIsLoading]}>
          <ErrorMessageContext.Provider value={[error, setError]}>
            <IonApp>
              <IonLoading cssClass='loader' isOpen={isLoading} message={t("General.Wait")} spinner={'lines'} />
              <IonReactRouter>
                <IonTabs>
                  <IonRouterOutlet>
                    <Route path="/:tab(map)" component={MainMap} exact={true} />
                    <Route path="/:tab(map)/new-marker/:lat/:lng/:zoom/:point" component={ManageMap} />
                    <Route path="/:tab(options)" component={Settings} exact={true} />
                    <Route path="/:tab(admin)" component={Admin} exact={true} />
                    <Route exact path="/" render={() => <Redirect to="/map" />} />
                  </IonRouterOutlet>
                  <IonTabBar slot="bottom">
                    <IonTabButton tab="map" href="/map">
                      <IonIcon icon={map} />
                      <IonLabel>{t("Nav.Map")}</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="options" href="/options">
                      <IonIcon icon={settings} />
                      <IonLabel>{t("Nav.Settings")}</IonLabel>
                    </IonTabButton>
                    {
                      isAdmin() &&
                      <IonTabButton tab="admin" href="/admin" disabled={user ? false : true}>
                        <IonIcon icon={peopleCircle} />
                        <IonLabel>{t("Nav.Admin")} </IonLabel>
                      </IonTabButton>
                    }
                  </IonTabBar>
                </IonTabs>
              </IonReactRouter>
              <IonToast
                isOpen={showErrorToast}
                message={errorMessage}
                color="danger"
                buttons={[
                  {
                    text: 'Ok',
                    role: 'Cancel',
                    icon: 'close',
                    handler: () => { setShowErrorToast(false) }
                  }
                ]}
              />
            </IonApp>
          </ErrorMessageContext.Provider>
        </LoaderContext.Provider>
      </LanguageContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
