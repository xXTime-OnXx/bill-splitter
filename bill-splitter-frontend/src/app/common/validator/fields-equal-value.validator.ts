import {UntypedFormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class FieldsEqualValueValidator {
  public validate(...fields: string[]): ValidatorFn {
    return (formGroup: UntypedFormGroup): ValidationErrors | null => {
      const allEqual = fields
        .map<string>(field => formGroup.get(field).value)
        .every((value: string, index: number, array: string[]) => value === array[0]);
      return allEqual ? null : {fieldsNotEqualValue: true};
    };
  }
}
