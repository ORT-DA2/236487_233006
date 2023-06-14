import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Article, } from "@shared/domain";
import {FilterFrom} from "@core";


export const articleListActions = createActionGroup({
	source: 'Article List',
	events: {
		'Reset' : emptyProps(),
		
		'Load Recent Articles': emptyProps(),
		'Load My Articles': emptyProps(),
		'Load Offensive Articles': emptyProps(),
		'Load User Articles' : props<{userId : number}>(),
		
		'Load Articles Success': props<{ articles: Article[] }>(),
		'Load Articles Failure': props<{ error: string }>(),
		
		'Filter Articles By' : props<{ filterBy: string , from : FilterFrom }>(),
		'Delete Article' : props<{ articleId: number }>(),
	},
});
