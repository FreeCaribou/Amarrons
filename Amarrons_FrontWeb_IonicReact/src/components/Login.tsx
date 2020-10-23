import React, { useEffect, useState, useContext } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { person, personAdd, power } from 'ionicons/icons';
import { UserService } from '../services/users/user.service';
import UserContext from '../hooks/useUserContext';
import TextInput from './forms/TextInput';
import LoaderContext from '../hooks/useLoaderContext';
import ErrorMessageContext from '../hooks/useErrorMessageContext';
import { useTranslation } from 'react-i18next';
import { validSimpleRequiredTextInput } from '../utils/ValidForm';

const Login: React.FC = () => {

  const { t } = useTranslation();

  const userService = new UserService();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [wantSignUp, setWantSignUp] = useState(false);

  const [user, setUser] = useContext(UserContext);
  const [, setIsLoading] = useContext(LoaderContext);
  const [, setErrorMessage] = useContext(ErrorMessageContext);

  useEffect(() => {

  }, []);

  const login: any = async () => {
    setIsLoading(true);
    userService.Login(email, password).then(data => {
      connectionSuccess(data);
    }).catch((error: any) => {
      connectionFailure(error);
    }).finally(() => {
      setIsLoading(false);
    })
  }

  const signUp: any = async () => {
    setIsLoading(true);
    userService.SignUp(email, name, password).then(data => {
      connectionSuccess(data);
    }).catch((error: any) => {
      connectionFailure(error);
    }).then(() => {
      setIsLoading(false);
    })
  }

  const logout: any = async () => {
    setUser(null as any);
    localStorage.removeItem('user_token');
  }

  const connectionSuccess: any = (data: any) => {
    localStorage.setItem('user_token', data.data.token);
    setUser(data.data);
  }

  const connectionFailure: any = (error: any) => {
    setUser(null as any);
    localStorage.removeItem('user_token');
    setErrorMessage(error.response);
  }

  // TODO verify email pattern
  const validEmail = () => {
    return validSimpleRequiredTextInput(email);
  }

  const validPassword = () => {
    return validSimpleRequiredTextInput(password);
  }

  const validName = () => {
    return validSimpleRequiredTextInput(name);
  }

  const validLoginButton = () => {
    return validEmail() && validPassword();
  }

  const validSignUpButton = () => {
    return validLoginButton() && validName();
  }

  return (
    <div className="padding-not-stick-edges">
      <form>

        {!user
          ?
          <div>
            <TextInput name={t("Form.Email")} value={email} setValue={setEmail} required={true} isValid={validEmail()} errorMessage={t("Form.NotValidEmail")} type={'email'} />

            <TextInput name={t("Form.Password")} value={password} setValue={setPassword} required={true} type={'password'} isValid={validPassword()} />

            {wantSignUp &&
              <TextInput name={t("Form.Name")} value={name} setValue={setName} required={true} isValid={validName()} />
            }

            <div className="margin-top-small">
              <section>
                <IonButton onClick={e => login()} expand={"block"} disabled={!validLoginButton()}>
                  {t("Form.Login")}
                  <IonIcon slot="end" icon={person} />
                </IonButton>
              </section>

              {!wantSignUp
                ?
                <section>
                  <IonButton onClick={e => setWantSignUp(true)} expand={"block"}>
                    {t("Form.NoAccountYet")}
                    <IonIcon slot="end" icon={personAdd} />
                  </IonButton>
                </section>
                :
                <section>
                  <IonButton onClick={e => signUp()} expand={"block"} disabled={!validSignUpButton()}>
                    {t("Form.SignUp")}
                    <IonIcon slot="end" icon={personAdd} />
                  </IonButton>
                </section>
              }

            </div>
          </div>
          :
          <div>
            <IonButton onClick={e => logout()} expand={"block"} color={'danger'}>
              {t("Form.Logout")}
              <IonIcon slot="end" icon={power} />
            </IonButton>
          </div>
        }

      </form>
    </div>
  );
};

export default Login;
