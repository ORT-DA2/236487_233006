import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, tap} from "rxjs";
import {formsActions} from "./forms.actions";
import {FormService} from "./form.service";

@Injectable()
export class FormsEffects {
	
	
	onFormReset$ = createEffect(() =>
			this.actions$.pipe(ofType(formsActions.resetForm),
				tap(() => this.formService.resetForm$.next())
			),
		{ dispatch: false }
	);
	
	
	onFormSubmit$ = createEffect(() =>
			this.actions$.pipe(ofType(formsActions.formSubmit),
				tap(() => this.formService.formSubmitted$.next())
			),
		{ dispatch: false }
	);
	
	constructor(
		private actions$: Actions,
		private formService: FormService
	) { }
}
