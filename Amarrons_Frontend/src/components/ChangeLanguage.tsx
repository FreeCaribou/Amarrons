import React, { useContext, useState } from 'react';
import { IonSelect, IonSelectOption, IonLabel, IonItem } from '@ionic/react';
import LanguageContext from '../hooks/useLanguageContext';

import { useTranslation } from 'react-i18next';

const languagesList = [
  {
    code: "en",
    label: "English"
  },
  {
    code: "fr",
    label: "Français",
  },
  {
    code: "de",
    label: "Deutsch"
  }
]

const ChangeLanguage: React.FC = () => {

  const { t } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useContext(LanguageContext);
  const [languages] = useState(languagesList);

  return (
    <div className="padding-not-stick-edges">
      <IonItem>
        <IonLabel>{t("General.Language")}</IonLabel>
        <IonSelect value={currentLanguage} onIonChange={e => setCurrentLanguage(e.detail.value)} interface={'popover'}>
          <IonSelectOption value="en">English</IonSelectOption>
          <IonSelectOption value="fr">French</IonSelectOption>
          <IonSelectOption value="de">Deutsch</IonSelectOption>
        </IonSelect>
      </IonItem>
      {/* <Dropdown name={t("General.Language")} value={currentLanguage} options={languages} setValue={setCurrentLanguage} /> */}
    </div>
  );
};

export default ChangeLanguage;
