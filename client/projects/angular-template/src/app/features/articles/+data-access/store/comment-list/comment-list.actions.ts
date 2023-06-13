import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Comment, CommentReply} from "@shared/domain";

export const commentListActions = createActionGroup({
	source: 'Comment List',
	events: {
		'Reset' : emptyProps(),
		
		'Approve Comment' : props<{ commentId: number }>(),
		'Reject Comment' : props<{ commentId: number}>(),
		
		'Load Offensive Comments': emptyProps(),
		'Load My Comments': emptyProps(),
		
		'Load Comments Success': props<{ comments: Comment[] }>(),
		'Load Comments Failure': props<{ error: string }>(),
		
		'Add Reply': props<{commentReply: CommentReply}>(),
		'Add Reply Success': props<{ reply: Comment }>(),
		'Add Reply Failure': props<{ error: string }>(),
		
		'Open Reply Box': props<{ commentId: number | null }>(),
		'Close Reply Box': emptyProps(),
	},
});
