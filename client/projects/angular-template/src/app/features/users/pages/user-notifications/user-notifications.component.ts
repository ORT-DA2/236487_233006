import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleCommentComponent} from "@articles/components/article-comment/article-comment.component";
import {CommentsService} from "@articles/+data-access/services/comments.service";
import {Store} from "@ngrx/store";
import {commentListQuery} from "@articles/+data-access/store/comment-list/comment-list.selectors";

@Component({
  selector: 'reply-to-comments',
  standalone: true,
  imports: [CommonModule, ArticleCommentComponent],
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class UserNotificationsComponent {
  showAddReply$ = this.commentsService.showAddReply$;
  
  constructor(private store: Store ,private commentsService : CommentsService) {}
  
  comments$  = this.store.select(commentListQuery.selectEntities)
  
  //FIXME : Here I need to react to reply, make article-comment dummer:
  
}
