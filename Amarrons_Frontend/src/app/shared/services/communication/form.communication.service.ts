import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { emailValidPattern } from '../../utils';
import { NoEmptyString } from '../../validators/no-empty-string.validator';

@Injectable({
  providedIn: 'root'
})
export class FormCommunicationService {

  constructor(
    public formBuilder: FormBuilder
  ) { }

  buildLoginForm() {
    return this.formBuilder.group({
      email: [environment.mock ? 'samy@amarrons.com' : '', [Validators.required, Validators.pattern(emailValidPattern)]],
      password: [environment.mock ? 'jeMeNoie' : '', [Validators.required, NoEmptyString]],
      name: [environment.mock ? 'Samy Gnu' : '']
    });
  }

  buildMarkerForm() {
    return this.formBuilder.group({
      label: ['', [Validators.required, NoEmptyString]],
      markerType: [, Validators.required],
      markerOptions: []
    });
  }

}