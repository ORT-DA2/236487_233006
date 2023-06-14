import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function createPasswordStrengthValidator(): ValidatorFn {
	return (control:AbstractControl) : ValidationErrors | null => {
		
		const value = control.value;
		
		if (!value) {
			return null;
		}
		
		const hasUpperCase = /[A-Z]+/.test(value);
		
		if(!hasUpperCase){
			return {hasUppercase:true}
		}
		
		const hasLowerCase = /[a-z]+/.test(value);
		
		if(!hasLowerCase){
			return {hasLowerCase:true}
		}
		
		const hasNumeric = /[0-9]+/.test(value);
		if(!hasNumeric) return {hasNumeric: true}
		
		const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
		
		return !passwordValid ? {passwordStrength:true}: null;
	}
}
