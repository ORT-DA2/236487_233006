import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticleCommentComponent} from "@articles/components/article-comment/article-comment.component";
import {Store} from "@ngrx/store";
import {CommentsService} from "@articles/+data-access/services/comments.service";
import {commentListQuery} from "@articles/+data-access/store/comment-list/comment-list.selectors";

@Component({
  selector: 'offensive-comments',
  standalone: true,
  imports: [CommonModule, ArticleCommentComponent],
  templateUrl: './offensive-comments.component.html',
  styleUrls: ['./offensive-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class OffensiveCommentsComponent {
  showAddReply$ = this.commentsService.showAddReply$;
  
  constructor(private store: Store ,private commentsService : CommentsService) {}
  
  comments$  = this.store.select(commentListQuery.selectEntities)
}
