import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from "@ngrx/store";
import {commentListQuery} from "@articles/+data-access/store/comment-list/comment-list.selectors";
import {Comment, CommentReply} from "@shared/domain";
import {commentListActions} from "@articles/+data-access/store/comment-list/comment-list.actions";
import {LoadingModule} from "@ui-components";
import {ErrorBadgeComponent} from "@shared/components/backend-error/error-badge.component";
import {CommentsService} from "@articles/+data-access/services/comments.service";
import {Observable} from "rxjs";
import {CommentListItemComponent} from "@articles/components/comment-list-item/comment-list-item.component";
import {combineLatest} from "rxjs";
import {CommentsVM} from "@articles/+data-access/store/comment-list/comment-list.reducers";

@Component({
  selector: 'reply-to-comments',
  standalone: true,
  imports: [CommonModule, CommentListItemComponent, LoadingModule, ErrorBadgeComponent, CommentListItemComponent],
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class UserNotificationsComponent  implements OnInit, OnDestroy{
  
  openedReplyBox$ = this.store.select(commentListQuery.selectOpenedReplyBox)
  
  comments$ : Observable<CommentsVM> = combineLatest({
    entities : this.store.select(commentListQuery.selectEntities),
    loading : this.store.select(commentListQuery.selectLoading),
    error : this.store.select(commentListQuery.selectError),
  })
  
  constructor(private store: Store, private commentsService: CommentsService) {}
  
  ngOnInit() {
    this.commentsService.userNotifications$.next(null)
  }
  
  onCommentReplied(commentReply : CommentReply){
    this.store.dispatch(commentListActions.addReply({commentReply}))
  }
  
  onReplyBoxOpened(commentId : number){
    this.store.dispatch(commentListActions.openReplyBox({commentId}))
  }
  
  onReplyBoxClosed(){
    this.store.dispatch(commentListActions.closeReplyBox())
  }
  
  ngOnDestroy() {
    this.store.dispatch(commentListActions.reset())
  }
}
