import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {FormState} from "../shared";



export const formsActions = createActionGroup({
	source: 'ngrxForms',
	events: {
		'Set Data': props<{ data: any }>(),
		'Set Structure': props<{ structure: any }>(),

		'Update Data': props<{ state : FormState}>(),

    'Reset Form': emptyProps(),
    'Destroy Form': emptyProps(),

	},
});
