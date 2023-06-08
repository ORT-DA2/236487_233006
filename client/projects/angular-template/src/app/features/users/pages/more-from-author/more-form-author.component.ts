import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleListComponent} from "@articles/components/article-list/article-list.component";
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
import {ArticleListVM} from "@shared/domain";
import {catchError} from "rxjs/operators";
import {FilterFrom} from "@core";

@Component({
  selector: 'more-from-author',
  standalone: true,
  imports: [CommonModule, ArticleListComponent, FilterArticlesComponent, UserHeaderComponent, LoadingModule],
  templateUrl: './more-form-author.component.html',
  styleUrls: ['./more-form-author.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class MoreFormAuthorComponent implements OnInit ,OnDestroy{
  
  user$ = this.store.select(userQuery.selectData)
  loadingUser$ = this.store.select(userQuery.selectLoading)
  
  private articles$ = this.store.select(articleListQuery.selectArticles)
  private loading$ = this.store.select(articleListQuery.selectLoading)
  private editing$ = this.store.select(articleListQuery.selectEditing)
  
  vm$: Observable<ArticleListVM> = combineLatest({
    articles: this.articles$,
    loading: this.loading$,
    editing: this.editing$,
    showFromAuthor : of(false)
  }).pipe(catchError(this.handleError))
  
  constructor(private store : Store, private route : ActivatedRoute) {}
  
  ngOnInit() {
    const userId = this.route.snapshot.params['userId'];
    this.store.dispatch(userActions.loadUser({userId}));
    this.store.dispatch(articleListActions.loadUserArticles({ userId }));
  }
  
  private handleError(error: any): Observable<any> {
    console.log('[ArticleListVM - ERROR', error)
    return of(true)
  }
  
  ngOnDestroy() {
    this.store.dispatch(userActions.reset())
  }
  
  onArticleFiltered(filterBy : string, authorId : number){
    const from = FilterFrom.AllArticles
    filterBy = `${filterBy}&authorId=${authorId}`
    
    this.store.dispatch(
      articleListActions.filterArticlesBy({filterBy , from })
    )
  }
}
