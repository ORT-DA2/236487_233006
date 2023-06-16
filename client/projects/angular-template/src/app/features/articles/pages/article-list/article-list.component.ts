import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FilterArticlesComponent} from '@articles/components/filter-articles/filter-articles.component'
import {catchError} from 'rxjs/operators'
import {Store} from '@ngrx/store'
import {articleListActions} from '@articles/+data-access/store/article-list/article-list.actions'
import {combineLatest, Observable, of} from "rxjs";
import {articleListQuery} from "@articles/+data-access/store/article-list/article-list.selectors";
import {DialogService, DialogType, FilterFrom} from "@core";
import {Article, ArticleListVM} from "@shared/domain";
import {ArticleListItemComponent} from "@articles/components/article-list-item/article-list-item.component";
import {wordsQuery} from "@users/+data-access/store/offensive-words/offensive-words.selectors";
import {DeleteDialogComponent} from "@shared/components/delete-dialog/delete-dialog.component";
import {LoadingModule} from '@ui-components';
import {ErrorBadgeComponent} from "@shared/components/backend-error/error-badge.component";

@Component({
  selector: 'article-list',
  standalone: true,
  imports: [
    CommonModule,
    FilterArticlesComponent,
    ArticleListItemComponent,
    DeleteDialogComponent,
    LoadingModule,
    ErrorBadgeComponent,
  ],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticleListComponent implements OnInit{
  
  words$ = this.store.select(wordsQuery.selectEntities)
  
  articles$: Observable<ArticleListVM> = combineLatest({
    entities: this.store.select(articleListQuery.selectEntities),
    loading: this.store.select(articleListQuery.selectLoading),
    error : this.store.select(articleListQuery.selectError),
  }).pipe(catchError(this.handleError))
  
  constructor(private store: Store,  private dialogService: DialogService) {}
  
  ngOnInit() {
    this.store.dispatch(articleListActions.loadRecentArticles())}
  
  onArticleFiltered(filterBy : string){
    const from = FilterFrom.Recent
    
    this.store.dispatch(
      articleListActions.filterArticlesBy({filterBy , from })
    )
  }
  
  onDeleteRequest(article: Article) {
    this.dialogService.openDialog(DialogType.Delete, {
      title: 'Delete Article',
      text: `Are you sure you want to delete "${article.title}"?`,
      data: article.id,
    })
  }
  
  onDeleteConfirmation(articleId: number) {
    this.store.dispatch(articleListActions.deleteArticle({ articleId }))
  }
  
  ngOnDestroy() {
    this.store.dispatch(articleListActions.reset())
  }
  
  private handleError(error: any): Observable<any> {
    console.log('[ArticleListVM - ERROR', error)
    return of(true)
  }
}
