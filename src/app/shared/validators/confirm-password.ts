import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const confirmPasswordValidator: ValidatorFn = 
    (group: AbstractControl): ValidationErrors | null => {
        const password = group.get('password')?.value;
        const confirmPassword = group.get('confirmPassword')?.value;
        return password !== confirmPassword ? { notSamePassword: true } : null;
    }

