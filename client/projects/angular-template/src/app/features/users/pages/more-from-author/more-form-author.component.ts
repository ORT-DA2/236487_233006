import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterArticlesComponent} from "@articles/components/filter-articles/filter-articles.component";
import {UserHeaderComponent} from "@users/components/user-header/user-header.component";
import {Store} from "@ngrx/store";
import {userActions} from "@users/+data-access/store/user/user.actions";
import {userQuery} from "@users/+data-access/store/user/user.selectors";
import {LoadingModule} from "@ui-components";
import {articleListActions} from "@articles/+data-access/store/article-list/article-list.actions";
import {ActivatedRoute} from "@angular/router";
import {articleListQuery} from "@articles/+data-access/store/article-list/article-list.selectors";
import {combineLatest, from, Observable, of} from "rxjs";
import {ArticleListVM, User} from "@shared/domain";
import {catchError} from "rxjs/operators";
import {FilterFrom} from "@core";
import {ArticleListItemComponent} from "@articles/components/article-list-item/article-list-item.component";
import {ErrorBadgeComponent} from "@shared/components/backend-error/error-badge.component";
import {wordsQuery} from "@users/+data-access/store/offensive-words/offensive-words.selectors";

export interface UserVM{
  data : User | null;
  loading : boolean
  error : string | null
}

@Component({
  selector: 'more-from-author',
  standalone: true,
  imports: [CommonModule, FilterArticlesComponent, UserHeaderComponent, LoadingModule, ArticleListItemComponent, ErrorBadgeComponent],
  templateUrl: './more-form-author.component.html',
  styleUrls: ['./more-form-author.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class MoreFormAuthorComponent implements OnInit ,OnDestroy{
  
  words$ = this.store.select(wordsQuery.selectEntities)
  
  articles$: Observable<ArticleListVM> = combineLatest({
    entities: this.store.select(articleListQuery.selectEntities),
    loading: this.store.select(articleListQuery.selectLoading),
    error : this.store.select(articleListQuery.selectError),
  }).pipe(catchError(this.handleError))
  
  
  user$ : Observable<UserVM> = combineLatest({
    data: this.store.select(userQuery.selectData),
    loading : this.store.select(userQuery.selectLoading),
    error : this.store.select(userQuery.selectError)
  }).pipe(catchError(this.handleError))
  
  constructor(private store : Store, private route : ActivatedRoute) {}
  
  ngOnInit() {
    const userId = this.route.snapshot.params['userId'];
    this.store.dispatch(userActions.loadUser({userId}));
    this.store.dispatch(articleListActions.loadUserArticles({ userId }));
  }
  
  onArticleFiltered(filterBy : string, authorId : number){
    const from = FilterFrom.AllArticles
    filterBy = `${filterBy}&authorId=${authorId}`
    
    this.store.dispatch(articleListActions.filterArticlesBy({filterBy , from }))
  }
  
  private handleError(error: any): Observable<any> {
    console.log('[ArticleListVM - ERROR', error)
    return of(true)
  }
  
  ngOnDestroy() {
    this.store.dispatch(userActions.reset())
    this.store.dispatch(articleListActions.reset())
  }
}
