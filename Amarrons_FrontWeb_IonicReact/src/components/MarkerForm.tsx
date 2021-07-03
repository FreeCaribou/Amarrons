import React, { useState, useContext } from 'react';
import { useIonViewDidEnter, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { add, create, trash } from 'ionicons/icons';
import TextInput from './forms/TextInput';
import { MarkerService } from '../services/markers/marker.service';
import Dropdown from './forms/Dropdown';
import LoaderContext from '../hooks/useLoaderContext';
import ErrorMessageContext from '../hooks/useErrorMessageContext';
import { validSimpleRequiredTextInput } from '../utils/ValidForm';
import { MarkerType } from '../models/marker-type.model';
import { MarkerOption } from '../models/marker-option.model';

export interface Props {
  position: any,
  goBack(): void
  id?: string
}

const MarkerForm: React.FC<Props> = (props) => {

  const { t } = useTranslation();

  const [, setIsLoading] = useContext(LoaderContext);
  const [, setErrorMessage] = useContext(ErrorMessageContext);

  const [label, setLabel] = useState('');
  const [markerTypes, setMarkerTypes] = useState<MarkerType[]>([]);
  const [markerType, setMarkerType] = useState<MarkerType>();
  const [markerOptions, setMarkerOptions] = useState<MarkerOption[]>([]);
  const [markerOptionSelected, setMarkerOptionSelected] = useState<MarkerOption[]>([]);
  const [updateMode, setUpdateMode] = useState(false);

  const markerService = new MarkerService();

  useIonViewDidEnter(async () => {
    console.log('marker form', props.id)
    setIsLoading(true);
    Promise.all([
      markerService.GetMarkerTypes(),
      markerService.GetMarkerOptions(),
      props.id ? markerService.GetOneMarker(props.id) : null])
      .then(async data => {
        setMarkerTypes(data[0].data);
        setMarkerOptions(data[1].data);
        if (data[2]) {
          const marker = data[2].data;
          console.log(marker);
          setLabel(marker.label);
          setMarkerType(marker.markerType);
          setMarkerOptionSelected(marker.markerOptions);
          setUpdateMode(true);
        }
      }).catch((error) => {
        setErrorMessage(error.response);
      }).finally(async () => {
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
    markerService.CreateMarker({
      lat: props.position.lat,
      lng: props.position.lng,
      label: label,
      markerType: markerType,
      markerOptions: markerOptionSelected
    }).then(data => {
      setIsLoading(false);
      props.goBack();
    }).catch(error => {
      setErrorMessage(error.response);
      setIsLoading(false);
    });
  }

  const clickDeleteButton = async () => {
    setIsLoading(true);
    markerService.DeleteOneMarker(props.id as string)
      .then(data => {
        setIsLoading(false);
        props.goBack();
      }).catch(error => {
        setErrorMessage(error.response);
        setIsLoading(false);
      });
  }

  const clickUpdateButton = async () => {
    setIsLoading(true);
    console.log('update', markerType, label, markerOptionSelected);
    markerService.UpdateMarker(
      { label, markerType, markerOptions: markerOptionSelected, lat: props.position.lat, lng: props.position.lng },
      props.id as string)
      .then(data => {
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
            <Dropdown
              name={t("Form.MarkerType")}
              value={markerType}
              options={markerTypes}
              setValue={setMarkerType}
              isValid={validMarkerType()}
              required={true} />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <Dropdown
              name={t("Form.MarkerOptions")}
              value={markerOptionSelected}
              options={markerOptions}
              setValue={setMarkerOptionSelected}
              multiple={true} />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>

            {
              updateMode
                ?
                <div>
                  <IonButton expand={"block"} disabled={!validAddButton()} onClick={e => clickUpdateButton()}>
                    {t("Form.Update")}
                    <IonIcon slot="end" icon={create} />
                  </IonButton>
                  <IonButton expand={"block"} onClick={e => clickDeleteButton()} color={'danger'}>
                    {t("Form.Delete")}
                    <IonIcon slot="end" icon={trash} />
                  </IonButton>
                </div>
                :
                <IonButton expand={"block"} disabled={!validAddButton()} onClick={e => clickAddButton()}>
                  {t("Form.Add")}
                  <IonIcon slot="end" icon={add} />
                </IonButton>
            }
          </IonCol>
        </IonRow>

      </IonGrid>
    </div>
  );
};

export default MarkerForm;
