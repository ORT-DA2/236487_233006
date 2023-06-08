import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createDateRangeValidator(): ValidatorFn {
	return (form: AbstractControl): ValidationErrors | null => {
		const start: Date = form.get("promoStartAt")?.value;
		const end: Date = form.get("promoEndAt")?.value;
		
		if (start && end && end.getTime() - start.getTime() >= 0) {
			return null;
		}
		
		return start && end ? { dateRangeInvalid: true } : null;
	};
}
