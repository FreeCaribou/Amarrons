import React, { useState } from 'react';
import { IonInput, IonItem, IonLabel, IonText } from '@ionic/react';
import { useTranslation } from 'react-i18next';

interface Props {
  setValue(e: any): void,
  name: string,
  value: any,
  required: boolean,
  // type of ion-input
  type?: "number" | "time" | "text" | "date" | "email" | "password" | "search" | "tel" | "url" | "week" | "month" | "datetime-local",
  isValid?: boolean,
  errorMessage?: string
}

// TODO name in IonIput, verify no space and replace it with underscore
const TextInput: React.FC<Props> = (props) => {

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
        <IonInput value={props.value} onIonChange={e => props.setValue(e.detail.value! as any)} type={props.type}
          required={props.required} name={props.name} onIonBlur={e => setHasBlur(true)} data-testid="ion-text-input" />
      </IonItem>

      {showErrorMessage() ?
        <IonText color={'danger'} className='error-message-display' data-testid="text-input-error-message"> {props.errorMessage || t("Form.NotValid")} </IonText>
        :
        <div className='error-message-display-empty'></div>
      }
    </div>
  );
}

export default TextInput;