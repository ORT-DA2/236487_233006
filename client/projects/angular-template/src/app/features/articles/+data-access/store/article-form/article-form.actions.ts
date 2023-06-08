import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Article} from "@shared/domain";

export const articleFormActions = createActionGroup({
	source: 'Article Form',
	events: {
		'Reset' : emptyProps(),
		'Publish Article': emptyProps(),
		'Publish Article Success': props<{ article: Article}>(),
		'Publish Article Failure': props<{ error: string }>(),
	},
});