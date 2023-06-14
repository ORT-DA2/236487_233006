import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Article, User} from "@shared/domain";
import {IOption} from "@ui-components";

export const articleFormActions = createActionGroup({
	source: 'Article Form',
	events: {
		'Reset' : emptyProps(),
		
		'Publish Article': emptyProps(),
		'Publish Article Success': props<{ article: Article}>(),
		'Publish Article Failure': props<{ error: string }>(),
		
		'Import Articles': emptyProps(),
		'Import Articles Success': props<{ article: Article}>(),
		'Import Articles Failure': props<{ error: string }>(),
		
		'Load Importer Options' : emptyProps(),
		'Load Importer Options Success' : props<{ options: IOption[]}>(),
		'Load Importer Options Failure' : props<{ error: string }>(),
	},
});
