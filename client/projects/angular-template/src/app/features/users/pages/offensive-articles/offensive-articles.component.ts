import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from "@ngrx/store";
import {articleListActions} from "@articles/+data-access/store/article-list/article-list.actions";
import {combineLatest, Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {articleListQuery} from "@articles/+data-access/store/article-list/article-list.selectors";
import {ArticleListVM} from "@shared/domain";
import {LoadingModule} from "@ui-components";
import {ErrorBadgeComponent} from "@shared/components/backend-error/error-badge.component";
import {ArticleListItemComponent} from "@articles/components/article-list-item/article-list-item.component";
import {wordsQuery} from "@users/+data-access/store/offensive-words/offensive-words.selectors";

@Component({
  selector: 'article-management',
  standalone: true,
  imports: [CommonModule, LoadingModule, ErrorBadgeComponent, ArticleListItemComponent],
  templateUrl: './offensive-articles.component.html',
  styleUrls: ['./offensive-articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class OffensiveArticlesComponent implements OnInit, OnDestroy{
  
  words$ = this.store.select(wordsQuery.selectEntities)
  
  articles$: Observable<ArticleListVM> = combineLatest({
    entities: this.store.select(articleListQuery.selectEntities),
    loading: this.store.select(articleListQuery.selectLoading),
    error : this.store.select(articleListQuery.selectError),
  }).pipe(catchError(this.handleError))
  
  constructor(private store: Store) {}
  
  ngOnInit() {
    this.store.dispatch(articleListActions.loadOffensiveArticles())
  }
  
  private handleError(error: any): Observable<any> {
    console.log('[ArticleListVM - ERROR', error)
    return of(true)
  }
  
  ngOnDestroy() {
    this.store.dispatch(articleListActions.reset())
  }
}
