import React, { useContext, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { chevronForward, navigateCircle, peopleCircle } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';
import VerifyRight from '../../components/VerifyRight';
import { decodeJwt } from '../../utils/Utils';
import UserContext from '../../hooks/useUserContext';

// TODO security
const Admin: React.FC<RouteComponentProps> = ({ history }) => {
  const { t } = useTranslation();

  const [isOk, setIsOk] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const onClickListItem = (path: string) => {
    history.push(path);
  }

  const isAdmin: any = () => {
    console.log('user for admin?', user);
    if (user && user.role) {
      return user.role.code === '3';
    }
    return false;
  }

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar color="primary">
          <IonTitle>{t("Nav.Admin")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        {!isOk
          ?
          <VerifyRight setIsOk={setIsOk} roles={['2', '3']} history={history} />
          :
          <IonList>

            <IonItem className="fake-select-mouse" onClick={e => onClickListItem('/admin/manage-unvalidated-marker')} >
              <IonIcon icon={navigateCircle} color="secondary" />
              <IonLabel className="margin-left-small">
                {t("Admin.ManageUnvalidatedMarker")}
              </IonLabel>
              <IonIcon icon={chevronForward} color="primary" />
            </IonItem>
            {
              isAdmin() &&
              <IonItem className="fake-select-mouse" onClick={e => onClickListItem('/admin/manage-user')}>
                <IonIcon icon={peopleCircle} color="secondary" />
                <IonLabel className="margin-left-small">
                  {t("Admin.ManageUser")}
                </IonLabel>
                <IonIcon icon={chevronForward} color="primary" />
              </IonItem>
            }

          </IonList>
        }

      </IonContent>
    </IonPage>
  )
}

export default Admin;