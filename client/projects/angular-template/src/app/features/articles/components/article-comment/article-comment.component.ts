import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core'
import { CommonModule } from '@angular/common'
import {Author, Comment, OffensiveWord, User} from '@shared/domain'
import { AgoPipe } from '@shared/pipes/ago.pipe'
import { AvatarModule } from 'primeng/avatar'
import {ButtonModule} from "primeng/button";
import {AddReplyComponent} from "@articles/components/add-reply/add-reply.component";
import {BehaviorSubject, Observable} from "rxjs";
import {HighlightDirective} from "@shared/highlight-directive";
import {isAdmin} from "@users/utils/helpers/is-admin";

@Component({
  selector: 'article-comment',
  standalone: true,
  imports: [CommonModule, AgoPipe, AvatarModule, ButtonModule, AddReplyComponent, HighlightDirective],
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentComponent {
  @Input() comment!: Comment
  @Input() showAddReply$ !: BehaviorSubject<number | null>
  @Input() canReply = false
  @Input() currentUser : User | null = null
  @Input() words$ !: Observable<OffensiveWord[]>
  
  @Output() commentApproved = new EventEmitter<number>()
  @Output() commentRejected = new EventEmitter<number>()
  
  getAuthorInitials(a : Author | undefined) : string{
    if(a) return a.firstName[0].toUpperCase() + a.lastName[0].toUpperCase()
    return ""
    
  }
  
  isAdmin(){
    if(!this.currentUser) return;
    return isAdmin(this.currentUser?.roles)
  }
  
}
