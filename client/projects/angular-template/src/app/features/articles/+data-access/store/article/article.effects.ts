import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {ArticleService} from '@articles/+data-access/services/article.service';
import {catchError, exhaustMap, map, tap} from "rxjs/operators";
import {articleActions} from "@articles/+data-access/store/article/article.actions";
import {concatMap, mergeMap, of} from "rxjs";
import {CommentsService} from "@articles/+data-access/services/comments.service";
import {formsActions, ngrxFormsQuery} from "@ui-components";
import {Store} from "@ngrx/store";
import {articleQuery} from "@articles/+data-access/store/article/article.selectors";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class ArticleEffects {
  
  approveArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.approveArticle),
      concatMap(({ articleId }) =>
        this.articlesService.approveArticle(articleId).pipe(
          map(( article ) => articleActions.loadArticleSuccess({ article })),
          catchError((error) => of(articleActions.loadArticleFailure(error)))
        )
      )
    )
  );
  
  rejectArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.rejectArticle),
      concatMap(({ articleId }) =>
        this.articlesService.rejectArticle(articleId).pipe(
          map(( article ) => articleActions.loadArticleSuccess({ article })),
          catchError((error) => of(articleActions.loadArticleFailure(error)))
        )
      )
    )
  );
  
  loadArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.loadArticle),
      concatMap(({ articleId }) =>
        this.articlesService.getArticle(articleId).pipe(
          map(( article ) => articleActions.loadArticleSuccess({ article })),
          catchError((error) => of(articleActions.loadArticleFailure(error)))
        )
      )
    )
  );
  
  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.addComment),
      concatLatestFrom(() => this.store.select(ngrxFormsQuery.selectData)),
      exhaustMap(([{ articleId, authorId }, {comment}]) =>
        this.commentsService.addComment(articleId, authorId, comment).pipe(
          map((comment) =>
            articleActions.addCommentSuccess({articleId, comment} )
          ),
          catchError((error) => of(articleActions.addCommentFailure(error)))
        )
      )
    )
  );
  
  addReply$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.addReply),
      exhaustMap((action) =>
        this.commentsService.addReply(action.commentId, action.payload).pipe(
          map((comment) =>
            articleActions.addReplySuccess()
          ),
          catchError((error) => of(articleActions.addReplyFailure(error)))
        )
      )
    )
  );
  
  addCommentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.addCommentSuccess),
      mergeMap(({articleId}) => [
        articleActions.loadArticle({articleId}),
        formsActions.resetForm()
      ])
    )
  );
  
  addCommentReply$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.addReplySuccess),
      concatLatestFrom(() => this.store.select(articleQuery.selectData)),
      mergeMap(([_,article]) => [
        articleActions.loadArticle({articleId : article?.id!}),
        formsActions.resetForm(),
        
      ])
    )
  );
  
  
  // SideEffect that closes any opened reply box if opened
  onLoadArticleSuccess$ =createEffect(() =>
      this.actions$.pipe(ofType(articleActions.loadArticleSuccess),
        tap(() => this.commentsService.showAddReply$.next(null)),
      ),
    {dispatch: false}
  )
  

  constructor(
    private actions$: Actions,
    private store : Store,
    private articlesService: ArticleService,
    private commentsService: CommentsService,
  ) {}
}
