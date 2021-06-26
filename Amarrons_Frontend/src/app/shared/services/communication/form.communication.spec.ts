import { FormBuilder, FormGroup } from "@angular/forms";
import { environment } from 'src/environments/environment';
import { FormCommunicationService } from './form.communication.service';

describe('The form communication', () => {

  let service: FormCommunicationService;
  let loginForm: FormGroup;
  let markerForm: FormGroup;

  beforeEach(() => {
    service = new FormCommunicationService(new FormBuilder());

    // we don't want pre mock fill in
    environment.mock = false;
    loginForm = service.buildLoginForm();
    markerForm = service.buildMarkerForm();
  });

  describe('Login', () => {
    it('form invalid when empty', () => {
      expect(loginForm.valid).toBeFalsy();
    });

    it('email validity', () => {
      let errors = {};
      let email = loginForm.controls['email'];
      expect(email.valid).toBeFalsy();

      errors = email.errors || {};
      expect(errors['required']).toBeTruthy();

      email.setValue("wrong@email");
      errors = email.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['pattern']).toBeTruthy();

      email.setValue("samy@amarrons.com");
      errors = email.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['pattern']).toBeFalsy();
    });

    it('password validity', () => {
      let errors = {};
      let password = loginForm.controls['password'];

      expect(password.valid).toBeFalsy();

      errors = password.errors || {};
      expect(errors['required']).toBeTruthy();
      expect(errors['isEmptyString']).toBeTruthy();

      password.setValue(' ');
      errors = password.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['isEmptyString']).toBeTruthy();

      password.setValue('jeMeNoie');
      expect(password.valid).toBeTruthy();
    });

    it('form valid when all is full and correct', () => {
      let email = loginForm.controls['email'];
      let password = loginForm.controls['password'];
      email.setValue("samy@amarrons.com");
      password.setValue('jeMeNoie');
      expect(loginForm.valid).toBeTruthy();
    });
  });

  describe('Marker', () => {
    it('form invalid when empty', () => {
      expect(markerForm.valid).toBeFalsy();
    });

    it('label validity', () => {
      let errors = {};
      let label = markerForm.controls['label'];
      expect(label.valid).toBeFalsy();

      errors = label.errors || {};
      expect(errors['required']).toBeTruthy();
      expect(errors['isEmptyString']).toBeTruthy();
    })
  });

});