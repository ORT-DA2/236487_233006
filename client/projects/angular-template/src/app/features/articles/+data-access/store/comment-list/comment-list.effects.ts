import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, of} from 'rxjs';
import {DialogService} from "@core";
import {Store} from "@ngrx/store";
import {CommentsService} from "@articles/+data-access/services/comments.service";
import {commentListActions} from "@articles/+data-access/store/comment-list/comment-list.actions";


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
      ofType(commentListActions.loadMyComments),
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
  
  
  
  constructor(
    private store: Store,
    private actions$: Actions,
    private commentsService: CommentsService,
  ) {}
}
