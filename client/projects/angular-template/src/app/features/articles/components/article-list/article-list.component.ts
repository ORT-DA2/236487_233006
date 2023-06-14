import {ChangeDetectionStrategy, Component, Input, OnDestroy} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {ArticleListItemComponent} from '@articles/components/article-list-item/article-list-item.component'
import {articleListActions} from '@articles/+data-access/store/article-list/article-list.actions'
import {LoadingModule} from '@ui-components'
import {DialogService, DialogType} from '@core'
import {DialogModule} from 'primeng/dialog'
import {FilterArticlesComponent} from '@articles/components/filter-articles/filter-articles.component'
import {DeleteDialogComponent} from '@shared/components/delete-dialog/delete-dialog.component'
import {Article, ArticleListVM} from "@shared/domain";
import {wordsQuery} from "@users/+data-access/store/offensive-words/offensive-words.selectors";


@Component({
  selector: 'article-list',
  standalone: true,
  imports: [
    CommonModule,
    ArticleListItemComponent,
    LoadingModule,
    DialogModule,
    FilterArticlesComponent,
    DeleteDialogComponent,
  ],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent implements OnDestroy {
  @Input() vm$ !: Observable<ArticleListVM>
  @Input() canDelete = true;
  words$ = this.store.select(wordsQuery.selectEntities)

  constructor(private store: Store, private dialogService: DialogService) {}

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


}
