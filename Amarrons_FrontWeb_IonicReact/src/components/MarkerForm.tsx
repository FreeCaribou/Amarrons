import React, { useState, useContext } from 'react';
import { useIonViewDidEnter, IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { add } from 'ionicons/icons';
import TextInput from './forms/TextInput';
import { MarkerService } from '../services/markers/marker.service';
import Dropdown from './forms/Dropdown';
import LoaderContext from '../hooks/useLoaderContext';
import ErrorMessageContext from '../hooks/useErrorMessageContext';
import { validSimpleRequiredTextInput } from '../utils/ValidForm';

export interface Props {
  position: any,
  goBack(): void
}

const MarkerForm: React.FC<Props> = (props) => {

  const { t } = useTranslation();

  const [, setIsLoading] = useContext(LoaderContext);
  const [, setErrorMessage] = useContext(ErrorMessageContext);

  const [label, setLabel] = useState('');
  const [markerTypes, setMarkerTypes] = useState([]);
  const [markerType, setMarkerType] = useState();
  const [markerOptions, setMarkerOptions] = useState([]);
  const [markerOptionSelected, setMarkerOptionSelected] = useState([]);

  const markerService = new MarkerService();

  useIonViewDidEnter(async () => {
    setIsLoading(true);
    Promise.all([markerService.GetMarkerTypes(), markerService.GetMarkerOptions()]).then(data => {
      setMarkerTypes(data[0].data);
      setMarkerOptions(data[1].data);
    }).catch((error) => {
      setErrorMessage(error.response);
    }).finally(() => {
      setIsLoading(false);
    });
  });

  const validLabel = () => {
    return validSimpleRequiredTextInput(label);
  }

  const validMarkerType = () => {
    return markerType != null;
  }

  const validAddButton = () => {
    return validLabel() && validMarkerType();
  }

  const clickAddButton = async () => {
    setIsLoading(true);
    markerService.CreateMarker({ lat: props.position.lat, lng: props.position.lng, label: label, markerType: markerType }).then(data => {
      setIsLoading(false);
      props.goBack();
    }).catch(error => {
      setErrorMessage(error.response);
      setIsLoading(false);
    });
  }

  return (
    <div className="padding-not-stick-edges">
      <IonGrid>

        <IonRow>
          <IonCol size="6">
            <TextInput name={t("Form.Label")} value={label} setValue={setLabel} required={true} isValid={validLabel()} data-testid="text-input-label" />
          </IonCol>
          <IonCol size="6">
            <Dropdown name={t("Form.MarkerType")} value={markerType} options={markerTypes} setValue={setMarkerType} isValid={validMarkerType()} required={true} />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <Dropdown name={t("Form.MarkerOptions")} value={markerOptionSelected} options={markerOptions} setValue={setMarkerOptionSelected} multiple={true} />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonButton expand={"block"} disabled={!validAddButton()} onClick={e => clickAddButton()}>
              {t("Form.Add")}
              <IonIcon slot="end" icon={add} />
            </IonButton>
          </IonCol>
        </IonRow>

      </IonGrid>
    </div>
  );
};

export default MarkerForm;
