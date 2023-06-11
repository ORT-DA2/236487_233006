import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Comment} from "@shared/domain";
import {UserService} from "@users/+data-access/services/user.service";
import {Observable} from "rxjs";
import {ArticleCommentComponent} from "@articles/components/article-comment/article-comment.component";
import {CommentsService} from "@articles/+data-access/services/comments.service";
import {Store} from "@ngrx/store";

@Component({
  selector: 'reply-to-comments',
  standalone: true,
  imports: [CommonModule, ArticleCommentComponent],
  templateUrl: './reply-to-comments.component.html',
  styleUrls: ['./reply-to-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ReplyToCommentsComponent implements OnInit{
  showAddReply$ = this.commentsService.showAddReply$;
  constructor(private store: Store ,private userService : UserService, private commentsService : CommentsService) {}
  
  comments$ !:Observable<Comment[]>
  
  //FIXME : Here I need to react to reply, make article-comment dummer:
  
  ngOnInit() {
    this.comments$ = this.userService.getUserActivities()
  }
  
}
