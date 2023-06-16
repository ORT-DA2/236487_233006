import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {articleListQuery} from "@articles/+data-access/store/article-list/article-list.selectors";
import {combineLatest, Observable, of} from "rxjs";
import {ArticleListVM} from "@shared/domain";
import {catchError, tap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {articleListActions} from "@articles/+data-access/store/article-list/article-list.actions";
import {FilterFrom} from "@core";
import {authQuery} from "@auth/+data-access/store/auth.selectors";
import {FilterArticlesComponent} from "@articles/components/filter-articles/filter-articles.component";
import {wordsQuery} from "@users/+data-access/store/offensive-words/offensive-words.selectors";
import {ArticleListItemComponent} from "@articles/components/article-list-item/article-list-item.component";
import {ErrorBadgeComponent} from "@shared/components/backend-error/error-badge.component";
import {LoadingModule} from "@ui-components";

@Component({
  selector: 'personal-articles',
  standalone: true,
  imports: [CommonModule, FilterArticlesComponent, ArticleListItemComponent, ErrorBadgeComponent, LoadingModule],
  templateUrl: './personal-articles.component.html',
  styleUrls: ['./personal-articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PersonalArticlesComponent implements OnInit, OnDestroy{
  
  user$ = this.store.select(authQuery.selectLoggedUser).pipe(tap(console.log))
  words$ = this.store.select(wordsQuery.selectEntities)
  
  articles$: Observable<ArticleListVM> = combineLatest({
    entities: this.store.select(articleListQuery.selectEntities),
    loading: this.store.select(articleListQuery.selectLoading),
    error : this.store.select(articleListQuery.selectError),
  }).pipe(catchError(this.handleError))
  
  constructor(private store: Store) {}
  
  ngOnInit() {
    this.store.dispatch(articleListActions.loadMyArticles())
  }
  
  onArticleFiltered(filterBy : string, authorId : number){
    const from = FilterFrom.AllArticles
  
    filterBy = `${filterBy}&authorId=${authorId}`
    
    this.store.dispatch(
      articleListActions.filterArticlesBy({filterBy , from })
    )
  }
  
  private handleError(error: any): Observable<any> {
    console.log('[ArticleListVM - ERROR', error)
    return of(true)
  }
  
  ngOnDestroy() {
    this.store.dispatch(articleListActions.reset())
  }
}
