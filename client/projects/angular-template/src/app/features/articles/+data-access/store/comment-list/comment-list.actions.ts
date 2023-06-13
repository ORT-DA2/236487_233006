import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Comment} from "@shared/domain";

export const commentListActions = createActionGroup({
	source: 'Comment List',
	events: {
		'Reset' : emptyProps(),
		
		'Load Offensive Comments': emptyProps(),
		'Load My Comments': emptyProps(),
		
		'Load Comments Success': props<{ comments: Comment[] }>(),
		'Load Comments Failure': props<{ error: string }>(),
	},
});
