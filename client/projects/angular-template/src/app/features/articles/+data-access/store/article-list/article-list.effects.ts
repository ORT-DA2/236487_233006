import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, debounceTime, distinctUntilChanged, map, of, switchMap} from 'rxjs';
import {ArticleService} from '@articles/+data-access/services/article.service';
import {articleListActions} from "@articles/+data-access/store/article-list/article-list.actions";
import {DialogService, DialogType} from "@core";
import {tap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {authQuery} from "@auth/+data-access/store/auth.selectors";

@Injectable()
export class ArticleListEffects {
  loadRecentArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleListActions.loadRecentArticles),
      concatMap((action) =>
        this.articlesService.getRecentArticles().pipe(
          map((articles) =>
            articleListActions.loadArticlesSuccess({articles} )
          ),
          catchError((error) =>
            of(articleListActions.loadArticlesFailure(error))
          )
        )
      )
    )
  );
  
  loadMyArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleListActions.loadMyArticles),
      concatLatestFrom(() => this.store.select(authQuery.selectLoggedUser)),
      concatMap(([_, user]) =>
        this.articlesService.getAllArticles(user?.id).pipe(
          map((articles) =>
            articleListActions.loadArticlesSuccess({articles} )
          ),
          catchError((error) =>
            of(articleListActions.loadArticlesFailure(error))
          )
        )
      )
    )
  );
  
  loadUserArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleListActions.loadUserArticles),
      concatMap(({userId}) =>
        this.articlesService.getAllArticles(userId).pipe(
          map((articles) =>
            articleListActions.loadArticlesSuccess({articles} )
          ),
          catchError((error) =>
            of(articleListActions.loadArticlesFailure(error))
          )
        )
      )
    )
  );
  
  
  loadOffensiveArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleListActions.loadOffensiveArticles),
      concatMap((action) =>
        this.articlesService.getOffensiveArticles().pipe(
          map((articles) =>
            articleListActions.loadArticlesSuccess({articles} )
          ),
          catchError((error) =>
            of(articleListActions.loadArticlesFailure(error))
          )
        )
      )
    )
  );
  
  
  // SideEffect that closes delete-articles-dialog is opened
  onLoadArticlesSuccess$ =createEffect(() =>
    this.actions$.pipe(ofType(articleListActions.loadArticlesSuccess),
      tap(() => this.dialogManager.closeDialog(DialogType.Delete))
      
    ),
{dispatch: false}
  )
  
  
  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleListActions.deleteArticle),
      concatMap(({articleId}) =>
        this.articlesService.deleteArticle(articleId).pipe(
          map(response => articleListActions.loadMyArticles())
        )
      )
    )
  )
  
  filterArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleListActions.filterArticlesBy),
      debounceTime(400), // Wait 400ms
      distinctUntilChanged(), // Only if the request string has changed
      switchMap((action) =>
        this.articlesService.filterBy(action.filterBy , action.from).pipe(
          map(articles => articleListActions.loadArticlesSuccess({articles}))
        )
      )
    )
  )
  
  constructor(
    private store: Store,
    private actions$: Actions,
    private articlesService: ArticleService,
    public readonly dialogManager : DialogService
  ) {}
}
