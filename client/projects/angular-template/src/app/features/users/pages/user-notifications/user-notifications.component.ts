import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleCommentComponent} from "@articles/components/article-comment/article-comment.component";
import {Store} from "@ngrx/store";
import {commentListQuery} from "@articles/+data-access/store/comment-list/comment-list.selectors";
import {CommentReply} from "@shared/domain";
import {commentListActions} from "@articles/+data-access/store/comment-list/comment-list.actions";
import {LoadingModule} from "@ui-components";
import {ErrorBadgeComponent} from "@shared/components/backend-error/error-badge.component";
import {CommentsService} from "@articles/+data-access/services/comments.service";

@Component({
  selector: 'reply-to-comments',
  standalone: true,
  imports: [CommonModule, ArticleCommentComponent, LoadingModule, ErrorBadgeComponent],
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class UserNotificationsComponent  implements OnInit, OnDestroy{
  
  comments$  = this.store.select(commentListQuery.selectEntities)
  loading$ = this.store.select(commentListQuery.selectLoading)
  error$ = this.store.select(commentListQuery.selectError)
  openedReplyBox$ = this.store.select(commentListQuery.selectOpenedReplyBox)
  
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
