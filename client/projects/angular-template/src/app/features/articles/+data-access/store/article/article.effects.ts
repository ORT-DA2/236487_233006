import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {ArticleService} from '@articles/+data-access/services/article.service';
import {catchError, exhaustMap, map, tap} from "rxjs/operators";
import {articleActions} from "@articles/+data-access/store/article/article.actions";
import {concatMap, mergeMap, noop, of, withLatestFrom} from "rxjs";
import {CommentsService} from "@articles/+data-access/services/comments.service";
import {formsActions, ngrxFormsQuery} from "@ui-components";
import {Store} from "@ngrx/store";
import {articleQuery} from "@articles/+data-access/store/article/article.selectors";
import {ToastrService} from "ngx-toastr";
import {authQuery} from "@auth/+data-access/store/auth.selectors";

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
  
  
  approveComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.approveArticleComment),
      concatMap(({ commentId }) =>
        this.commentsService.approveComment(commentId).pipe(
          map(( {articleId} ) => {
            this.toast.success("Comment now is visible for all users", "Comment accepted")
            
            return articleActions.loadArticle({ articleId })
          }),
          catchError((error) => of(articleActions.loadArticleFailure(error)))
        )
      )
    )
  );
  
  rejectComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.rejectArticleComment),
      concatMap(({ commentId }) =>
        this.commentsService.rejectComment(commentId).pipe(
          map(({articleId} ) => {
            this.toast.success("Comment has been rejected", "Comment Rejected")
            return articleActions.loadArticle({articleId})
          }),
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
          map((comment) =>  articleActions.addCommentSuccess({articleId, comment})),
          catchError((error) => of(articleActions.addCommentFailure(error)))
        )
      )
    )
  );
  
  addCommentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.addCommentSuccess),
      mergeMap(({articleId , comment}) =>{
        if(!comment.isApproved) this.toast.info("Comment has been put under review because it contains offensive words. Once it is approved it will be visible for other users", "Comment under revision", { tapToDismiss : false, timeOut: 20000 , closeButton :true})
        return [
          articleActions.loadArticle({articleId}),
          formsActions.resetForm()
        ]
      })
    )
  );
  
  addReply$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.addReply),
      exhaustMap((action) =>
        this.commentsService.addReply(action.replyId, action.payload).pipe(
          map((reply) => articleActions.addReplySuccess({reply, articleId : action.articleId})),
          catchError((error) => of(articleActions.addReplyFailure(error)))
        )
      )
    )
  );
  
  addReplySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.addReplySuccess),
      mergeMap(({reply, articleId}) => {
        if(!reply.isApproved) this.toast.info("Reply has been put under review because it contains offensive words. Once it is approved it will be visible for other users", "Reply under revision", { tapToDismiss : false, timeOut: 20000 , closeButton :true})
        return[
          articleActions.loadArticle({articleId}),
          formsActions.resetForm(),
        ]
      })
    )
  );
  
  onMarkAllCommentsAsViewed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.markAllCommentsAsViewed),
      withLatestFrom(this.store.select(articleQuery.selectData)),
      concatMap(([_, article]) =>
        this.articlesService.markAllCommentsAsViewed(article?.id!)
      )
    ),
    { dispatch: false }
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
    private toast : ToastrService
  ) {}
}
