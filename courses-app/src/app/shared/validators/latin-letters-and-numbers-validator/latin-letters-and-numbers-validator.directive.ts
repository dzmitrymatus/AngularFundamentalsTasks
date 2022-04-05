import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

export function validateLatinLettersAndNumbersOnly(control: AbstractControl): ValidationErrors | null {
  if(!control.value) return null;

  var regExp = new RegExp('^(?!\\s)[a-zA-Z0-9\\s]*$');
  
  return regExp.test(control.value) ? null : {latinLettersAndNumbersValidator : true}; 
}

@Directive({
  selector: '[appLatinLettersAndNumbersValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: LatinLettersAndNumbersValidatorDirective,
    multi: true}]
})
export class LatinLettersAndNumbersValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return validateLatinLettersAndNumbersOnly(control);
  }

}
