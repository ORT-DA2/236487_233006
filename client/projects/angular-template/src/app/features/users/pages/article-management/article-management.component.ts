import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {articleListActions} from "@articles/+data-access/store/article-list/article-list.actions";
import {ArticleListComponent} from "@articles/components/article-list/article-list.component";
import {combineLatest, Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {articleListQuery} from "@articles/+data-access/store/article-list/article-list.selectors";
import {ArticleListVM} from "@shared/domain";
import {LoadingModule} from "@ui-components";

@Component({
  selector: 'article-management',
  standalone: true,
  imports: [CommonModule, ArticleListComponent, LoadingModule],
  templateUrl: './article-management.component.html',
  styleUrls: ['./article-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ArticleManagementComponent implements OnInit, OnDestroy{
  
  private articles$ = this.store.select(articleListQuery.selectArticles)
  loading$ = this.store.select(articleListQuery.selectLoading)
  
  vm$: Observable<ArticleListVM> = combineLatest({
    articles: this.articles$,
    loading: this.loading$,
    editing: of(true),
    showFromAuthor : of(false)
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
