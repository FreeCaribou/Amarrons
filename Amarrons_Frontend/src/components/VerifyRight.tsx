import { IonProgressBar, useIonViewWillEnter } from '@ionic/react';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorMessageContext from '../hooks/useErrorMessageContext';
import LoaderContext from '../hooks/useLoaderContext';
import { customRouteGuard } from '../utils/Utils';

interface Props {
  setIsOk(data: any): void,
  roles: string[],
  history: any
}

const VerifyRight: React.FC<Props> = (props) => {

  const { t } = useTranslation();
  const [, setErrorMessage] = useContext(ErrorMessageContext);
  const [, setIsLoading] = useContext(LoaderContext);

  useIonViewWillEnter(async () => {
    setIsLoading(true);
    const isOk = await customRouteGuard(props.roles, setErrorMessage, props.history);
    console.log('have you the right?', isOk);
    props.setIsOk(isOk);
    if (!isOk) {
      props.history.push(`/options`);
    }
    setIsLoading(false);
  });


  return (
    <div className="padding-not-stick-edges">
      <h1>
        {t('Nav.VerifyRight')}
        <hr />
        <IonProgressBar type="indeterminate" color="secondary" />
      </h1>
    </div>
  );
};

export default VerifyRight;
