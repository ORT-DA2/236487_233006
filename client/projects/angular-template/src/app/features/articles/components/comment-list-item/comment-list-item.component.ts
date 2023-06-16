import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core'
import { CommonModule } from '@angular/common'
import {Author, Comment, CommentReply, OffensiveWord, User} from '@shared/domain'
import { AgoPipe } from '@shared/pipes/ago.pipe'
import { AvatarModule } from 'primeng/avatar'
import {ButtonModule} from "primeng/button";
import {AddReplyComponent} from "@articles/components/add-reply/add-reply.component";
import {Observable} from "rxjs";
import {HighlightDirective} from "@shared/highlight-directive";

@Component({
  selector: 'comment-list-item',
  standalone: true,
  imports: [CommonModule, AgoPipe, AvatarModule, ButtonModule, AddReplyComponent, HighlightDirective],
  templateUrl: './comment-list-item.component.html',
  styleUrls: ['./comment-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListItemComponent {
  @Input() comment!: Comment
  @Input() openedReplyBox$ !: Observable<number | null>
  @Input() words$ !: Observable<OffensiveWord[]>
  
  @Input() canReply = false
  @Input() canApproveAndReject = false
  
  @Output() commentApproved = new EventEmitter<number>()
  @Output() commentRejected = new EventEmitter<number>()
  @Output() commentReplied = new EventEmitter<CommentReply>()
  
  @Output() openedReplyBox = new EventEmitter<number>()
  @Output() closedReplyBox = new EventEmitter<void>()
  
  getAuthorInitials(a : Author | undefined) : string{
    if(a) return a.firstName[0].toUpperCase() + a.lastName[0].toUpperCase()
    return ""
  }
  
  onCommentReply(reply : string){
    this.commentReplied.emit({
      commentId : this.comment.id,
      content: reply,
      articleId : this.comment.articleId
    })
  }
}
