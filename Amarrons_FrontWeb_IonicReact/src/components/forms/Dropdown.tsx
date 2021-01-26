import React, { useState } from 'react';
import { IonItem, IonLabel, IonText, IonSelect, IonSelectOption } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { CodeLabel } from '../../models/code-label';

interface Props {
  setValue(e: any): void,
  name: string,
  value: any,
  // code - label
  options: any[],
  required?: boolean,
  isValid?: boolean,
  errorMessage?: string
  multiple?: boolean
}

// TODO name in IonIput, verify no space and replace it with underscore
const Dropdown: React.FC<Props> = (props) => {

  const { t } = useTranslation();

  const [hasBlur, setHasBlur] = useState(false);

  const showErrorMessage: any = () => {
    if (props.isValid === undefined) {
      return false;
    } else {
      return hasBlur && !props.isValid;
    }
  }

  return (
    <div>
      <IonItem className={showErrorMessage() && 'input-error'}>
        <IonLabel position="floating">{props.name} {props.required && '*'}</IonLabel>
        <IonSelect value={props.value} placeholder={props.multiple ? t("Form.PleaseSelectOneOrMany") : t("Form.PleaseSelectOne")} onIonChange={e => props.setValue(e.detail.value! as any)}
          name={props.name} onIonBlur={e => setHasBlur(true)} interface={'popover'} multiple={props.multiple}>
          {
            props.options.map((e: CodeLabel) => (
              <IonSelectOption key={e.code} value={e}>
                {e.label}
              </IonSelectOption>
            ))
          }
        </IonSelect>
      </IonItem>

      {showErrorMessage() ?
        <IonText color={'danger'} className='error-message-display'> {props.errorMessage || t("Form.NotValid")} </IonText>
        :
        <div className='error-message-display-empty'></div>
      }
    </div>
  );
}

export default Dropdown;