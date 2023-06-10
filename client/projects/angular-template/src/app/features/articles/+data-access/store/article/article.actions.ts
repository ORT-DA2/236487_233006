import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Article, Comment, NewReply} from "@shared/domain";

export const articleActions = createActionGroup({
  source: 'Article',
  events: {
    reset: emptyProps(),
    'Approve Article': props<{ articleId: number }>(),
    'Reject Article': props<{ articleId: number }>(),
    
    'Approve Article Comment' : props<{ commentId: number }>(),
    'Reject Article Comment' : props<{ commentId: number }>(),
    
    'Load Article': props<{ articleId: number }>(),
    'Load Article Success': props<{ article: Article}>(),
    'Load Article Failure': props<{ error: string }>(),
  
    'Load Comments': props<{ slug: string }>(),
    'Load Comments Success': props<{ comments: Comment[] }>(),
    'Load Comments Failure': props<{ error: string }>(),
    
    'Add Comment': props<{articleId: number, authorId: number}>(),
    'Add Comment Success': props<{ articleId: number , comment: Comment }>(),
    'Add Comment Failure': props<{ error: string }>(),
  
    'Add Reply': props<{replyId: number, payload: NewReply}>(),
    'Add Reply Success': props<{  reply: Comment }>(),
    'Add Reply Failure': props<{ error: string }>(),
  },
});
