import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {FormState} from "../shared";
import {IOption} from "../../select-field/select-field.component";



export const formsActions = createActionGroup({
	source: 'ngrxForms',
	events: {
		'Set Data': props<{ data: any }>(),
		'Set Structure': props<{ structure: any }>(),
		'Set Options' : props<{ key : string, options : IOption[]}>(),

		'Update Data' : props<{ state : FormState}>(),
		
		'Form Submit': emptyProps(),
    'Reset Form': emptyProps(),
    'Destroy Form': emptyProps(),

	},
});
