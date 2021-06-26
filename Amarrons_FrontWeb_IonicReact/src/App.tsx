import React, { useEffect, useState } from 'react';
import { Redirect, Route, useParams } from 'react-router-dom';
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
import { map, settings, terminal } from 'ionicons/icons';
import { getPlatforms } from '@ionic/react';

import MainMap from './pages/tabs/MainMap';
import Settings from './pages/tabs/Settings';

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
import ManageMap from './pages/ManageMap';
import LoaderContext from './hooks/useLoaderContext';
import ErrorMessageContext from './hooks/useErrorMessageContext';
import Admin from './pages/tabs/Admin';
import { InternalErrorEnum } from './models/enum/internal-error.enum';
import ManageUnvalidatedMarker from './pages/ManageUnvalidatedMarker';
import ManageUser from './pages/ManagerUser';
import { decodeJwt } from './utils/Utils';
import { UserService } from './services/users/user.service';

const App: React.FC = () => {

  require('dotenv').config();

  const { t, i18n } = useTranslation();

  const [user, setUser] = useState(null as any);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null as any);
  const [currentLanguage, setCurrentLanguage] = useState('en' as any);
  const [hasAdminAccess, setHasAdminAccess] = useState(false);

  // en, fr, de only for the moment because of the target audience
  // nl, no come later
  const [acceptedLanguage] = useState(['en', 'fr', 'de']);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const init = async () => {
      console.log('hello app on ', getPlatforms());

      let userLocalStorage = localStorage.getItem('user_token');
      if (userLocalStorage) {
        setIsLoading(true);
        const userService = new UserService();
        const result = (await userService.VerifyToken()).data;
        if (result && result.isValid) {
          console.log('nice the token is good');
          let userLocalDecoded = await decodeJwt(result.token);
          userLocalDecoded.token = result.token;
          setUser(userLocalDecoded);
        }
        setIsLoading(false);
      }

      const localLng = localStorage.getItem('lng');
      if (localLng) {
        setCurrentLanguage(localLng);
      } else {
        let userLang = navigator.language;
        userLang = userLang.slice(0, 2);
        setCurrentLanguage(userLang);
      }
    }
    init();
  }, []);

  useEffect(() => {
    console.log('user?', user);
    if (user) {
      setHasAdminAccess(user.role.code === '3' || user.role.code === '2');
    } else {
      setHasAdminAccess(false);
    }
  }, [user]);

  useEffect(() => {
    changeLanguage(currentLanguage);
  }, [currentLanguage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (error) {
      if (error.internal) {
        switch (error.internal) {
          case InternalErrorEnum.NoRightToAccess:
            setErrorMessage(t('Error.NoPermission'));
            break;
          default:
            setErrorMessage('There is an error');
            break;
        }
      } else if (error.data && error.data.message) {
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
                    <Route path="/:tab(map)" component={MainMap} exact />
                    <Route path="/:tab(map)/new-marker/:lat/:lng/:zoom/:point" component={ManageMap} />
                    <Route path="/:tab(options)" component={Settings} exact />
                    <Route path="/:tab(admin)" component={Admin} exact />
                    <Route path="/:tab(admin)/manage-unvalidated-marker" component={ManageUnvalidatedMarker} exact />
                    <Route path="/:tab(admin)/manage-user" component={ManageUser} exact />

                    {/* <Redirect from="/" to="/map" exact /> */}
                    <Route exact path="/" render={() => <Redirect to="/map" />} />

                    {/* not perfect no match detection but limited with the doc */}
                    <Route component={MainMap} />
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
                    <IonTabButton tab="admin" href="/admin" style={{ display: hasAdminAccess ? '' : 'none' }} >
                      <IonIcon icon={terminal} />
                      <IonLabel>{t("Nav.Admin")} </IonLabel>
                    </IonTabButton>

                    {/* Have a bug with it, if we start the page at admin, the first tab (map) become also admin! */}
                    {/* {
                      hasAdminAccess &&
                      <IonTabButton tab="admin" href="/admin" >
                        <IonIcon icon={terminal} />
                        <IonLabel>{t("Nav.Admin")} </IonLabel>
                      </IonTabButton>
                    } */}
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