import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dependentFieldValidator(mainFieldControl: AbstractControl, requiredValue: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    if (!mainFieldControl || mainFieldControl.value != requiredValue) 
    {
      console.log("no es requerido")
      return null;
    }

    const dependentFieldValue = control.value;
    if (dependentFieldValue == null || dependentFieldValue === '') 
    {
      console.log("es requerido")
      return { dependentFieldRequired: true };
    }

    return null;
  };
}
