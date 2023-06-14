import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {articleListQuery} from "@articles/+data-access/store/article-list/article-list.selectors";
import {combineLatest, Observable, of} from "rxjs";
import {ArticleListVM} from "@shared/domain";
import {catchError} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {articleListActions} from "@articles/+data-access/store/article-list/article-list.actions";
import {FilterFrom} from "@core";
import {authQuery} from "@auth/+data-access/store/auth.selectors";
import {ArticleListComponent} from "@articles/components/article-list/article-list.component";
import {FilterArticlesComponent} from "@articles/components/filter-articles/filter-articles.component";

@Component({
  selector: 'personal-articles',
  standalone: true,
  imports: [CommonModule, ArticleListComponent, FilterArticlesComponent],
  templateUrl: './personal-articles.component.html',
  styleUrls: ['./personal-articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PersonalArticlesComponent implements OnInit{
  
  private articles$ = this.store.select(articleListQuery.selectEntities)
  private loading$ = this.store.select(articleListQuery.selectLoading)
  private editing$ = this.store.select(articleListQuery.selectEditing)
  
  user$ = this.store.select(authQuery.selectLoggedUser)
  
  vm$: Observable<ArticleListVM> = combineLatest({
    articles: this.articles$,
    loading: this.loading$,
    editing: this.editing$,
    showFromAuthor : of(false)
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
}
