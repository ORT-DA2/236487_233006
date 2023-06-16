import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Store } from '@ngrx/store'
import { commentListQuery } from '@articles/+data-access/store/comment-list/comment-list.selectors'
import { commentListActions } from '@articles/+data-access/store/comment-list/comment-list.actions'
import { ErrorBadgeComponent } from '@shared/components/backend-error/error-badge.component'
import { LoadingModule } from '@ui-components'
import { CommentListItemComponent } from '@articles/components/comment-list-item/comment-list-item.component'
import { combineLatest, Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Component({
  selector: 'offensive-comments',
  standalone: true,
  imports: [
    CommonModule,
    CommentListItemComponent,
    ErrorBadgeComponent,
    LoadingModule,
  ],
  templateUrl: './offensive-comments.component.html',
  styleUrls: ['./offensive-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OffensiveCommentsComponent implements OnDestroy {
  comments$ = combineLatest({
    entities: this.store.select(commentListQuery.selectEntities),
    loading: this.store.select(commentListQuery.selectLoading),
    error: this.store.select(commentListQuery.selectError),
  }).pipe(catchError(this.handleError))

  openedReplyBox$ = this.store.select(commentListQuery.selectOpenedReplyBox)

  constructor(private store: Store) {}

  onCommentApprove(commentId: number) {
    this.store.dispatch(commentListActions.approveComment({ commentId }))
  }

  onCommentReject(commentId: number) {
    this.store.dispatch(commentListActions.rejectComment({ commentId }))
  }

  onReplyBoxOpened(commentId: number) {
    this.store.dispatch(commentListActions.openReplyBox({ commentId }))
  }

  onReplyBoxClosed() {
    this.store.dispatch(commentListActions.closeReplyBox())
  }

  private handleError(error: any): Observable<any> {
    console.log('[ArticleListVM - ERROR', error)
    return of(true)
  }

  ngOnDestroy() {
    this.store.dispatch(commentListActions.reset())
  }
}
