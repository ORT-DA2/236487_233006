import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleCommentComponent} from "@articles/components/article-comment/article-comment.component";
import {Store} from "@ngrx/store";
import {commentListQuery} from "@articles/+data-access/store/comment-list/comment-list.selectors";
import {commentListActions} from "@articles/+data-access/store/comment-list/comment-list.actions";
import {ErrorBadgeComponent} from "@shared/components/backend-error/error-badge.component";
import {LoadingModule} from "@ui-components";

@Component({
  selector: 'offensive-comments',
  standalone: true,
  imports: [CommonModule, ArticleCommentComponent, ErrorBadgeComponent, LoadingModule],
  templateUrl: './offensive-comments.component.html',
  styleUrls: ['./offensive-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class OffensiveCommentsComponent implements OnDestroy{
  comments$  = this.store.select(commentListQuery.selectEntities)
  loading$ = this.store.select(commentListQuery.selectLoading)
  error$ = this.store.select(commentListQuery.selectError)
  openedReplyBox$ = this.store.select(commentListQuery.selectOpenedReplyBox)
  
  constructor(private store: Store  ) {}
  
  onCommentApprove(commentId : number  ){
     this.store.dispatch(commentListActions.approveComment({commentId}))
  }
  
  onCommentReject(commentId : number ){
     this.store.dispatch(commentListActions.rejectComment({commentId}))
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
