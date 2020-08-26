import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
declare var moment: any;

export class ValidatorService extends Validators {
  // constructor() { super() }
  // ValidateUrl(control: AbstractControl) {
  static ValidateUrl(control: FormControl) {
    if (!control.value.startsWith('https') || !control.value.includes('.io')) {
      return { validUrl: true };
    }
    return null;
  }

 
  static NoWhitespaceValidator(control: FormControl) {
    const str = control.value.toString();
    if (!str.replace(/\s/g, '').length && str.length > 0) {
      return { whitespace: true };
    } else {
      return null;
    }
  }
  static validateCharacters(control: FormControl) {
    const validCharacters = /[^\s\w,.:&\/()+%'`@-]/;
    // first check if the control has a value
    if (control.value && control.value.length > 0) {
      // match the control value against the regular expression
      const matches = control.value.match(validCharacters);
      // if there are matches return an object, else return null.
      return matches && matches.length ? { invalid_characters: matches } : null;
    } else {
      return null;
    }
  }
 
  static numbersOnly(control: FormControl) {
    const regex = '^[0-9]*$';
    if (control.value && control.value.length > 0) {
      const matches = control.value.match(regex);
      return matches && matches.length ? null : { numbers_only: true };
    } else {
      return null;
    }
  }
  static numberAndDecimal(control: FormControl) {
    const regex = /^[-+]?[0-9]+(\.[0-9]+)?$/;
    if (control.value && control.value.length > 0) {
      const matches = control.value.match(regex);
      return matches && matches.length ? null : { numbers_decimal_only: true };
    } else {
      return null;
    }
  }

  static validateCNIC(control: FormControl) {
    const regex = '^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$';
    if (control.value && control.value.length > 0) {
      const matches = control.value.match(regex);
      return matches && matches.length ? null : { invalid_cnic: true };
    } else {
      return null;
    }
  }
  static positiveOnly(control: FormControl) {
    if (control.value < 0) {
      return { positiveOnly: true };
    } else {
      return null;
    }
  }
  static validYear(control: FormControl) {
    const currentYear = moment().year();
    const val = control.value;
    if (val) {
      return null;
    } else {
      return null;
    }
  }
  static notFutureDate(control: FormControl) {
    const date = new Date(control.value).getTime();
    return new Date().getTime() > date ? null : { isFutureDate: true };
  }

  static dropdownValidator(control: FormControl) {
    if (parseInt(control.value, 10) > 0) {
      return null;
    } else {
      return { notValid: true };
    }
  }
  
}
