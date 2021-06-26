import { AbstractControl } from '@angular/forms';

export function NoEmptyString(control: AbstractControl) {
  if (control.value.trim() == '') {
    return { isEmptyString: true };
  }
  return null;
}