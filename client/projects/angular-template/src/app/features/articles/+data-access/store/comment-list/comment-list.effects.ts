import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, mergeMap, of} from 'rxjs';
import {DialogService} from "@core";
import {Store} from "@ngrx/store";
import {CommentsService} from "@articles/+data-access/services/comments.service";
import {commentListActions} from "@articles/+data-access/store/comment-list/comment-list.actions";
import {articleActions} from "@articles/+data-access/store/article/article.actions";
import {exhaustMap} from "rxjs/operators";
import {formsActions} from "@ui-components";
import {ToastrService} from "ngx-toastr";


@Injectable()
export class CommentListEffects {
  loadMyComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(commentListActions.loadMyComments),
      concatMap((action) =>
        this.commentsService.getMyComments().pipe(
          map((comments) =>
            commentListActions.loadCommentsSuccess({comments} )
          ),
          catchError((error) =>
            of(commentListActions.loadCommentsFailure(error))
          )
        )
      )
    )
  );
  
  loadOffensiveComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(commentListActions.loadOffensiveComments),
      concatMap((action) =>
        this.commentsService.getOffensiveComments().pipe(
          map((comments) =>
            commentListActions.loadCommentsSuccess({comments} )
          ),
          catchError((error) =>
            of(commentListActions.loadCommentsFailure(error))
          )
        )
      )
    )
  );
  
  
  addReply$ = createEffect(() =>
    this.actions$.pipe(
      ofType(commentListActions.addReply),
      exhaustMap(({commentReply}) =>
        this.commentsService.addReply(commentReply.commentId, commentReply).pipe(
          map((reply) => commentListActions.addReplySuccess({reply })),
          catchError((error) => of(commentListActions.addReplyFailure(error)))
        )
      )
    )
  );
  
  addReplySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(commentListActions.addReplySuccess),
      mergeMap(({reply}) => {
        if(!reply.isApproved) this.toast.info("Reply has been put under review because it contains offensive words. Once it is approved it will be visible for other users", "Reply under revision", { tapToDismiss : false, timeOut: 20000 , closeButton :true})
        if(reply.isApproved) this.toast.success("Comment successfully replied", "Comment replied")
  
        return[
          commentListActions.loadMyComments(),
          commentListActions.closeReplyBox(),
          formsActions.resetForm(),
        ]
      })
    )
  );
  
  
  approveComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(commentListActions.approveComment),
      concatMap(({ commentId }) =>
        this.commentsService.approveComment(commentId).pipe(
          map(() => {
            this.toast.success("Comment now is visible for all users", "Comment accepted")
            return commentListActions.loadOffensiveComments()
          }),
          catchError((error) => of(commentListActions.loadCommentsFailure(error)))
        )
      )
    )
  );
  
  rejectComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(commentListActions.rejectComment),
      concatMap(({ commentId }) =>
        this.commentsService.rejectComment(commentId).pipe(
          map(() => {
            this.toast.success("Comment has been rejected", "Comment Rejected")
            return commentListActions.loadOffensiveComments()
          }),
          catchError((error) => of(commentListActions.loadCommentsFailure(error)))
        )
      )
    )
  );
  
  constructor(
    private store: Store,
    private actions$: Actions,
    private commentsService: CommentsService,
    private toast : ToastrService
  ) {}
}
