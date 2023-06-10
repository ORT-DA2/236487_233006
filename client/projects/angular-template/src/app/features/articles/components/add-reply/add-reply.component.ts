import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TextAreaFieldModule} from "@ui-components";
import {ButtonModule} from "primeng/button";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Store} from "@ngrx/store";
import {articleActions} from "@articles/+data-access/store/article/article.actions";
import {User} from "@shared/domain";

@Component({
  selector: 'add-reply',
  standalone: true,
  imports: [CommonModule, TextAreaFieldModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './add-reply.component.html',
  styleUrls: ['./add-reply.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddReplyComponent {
  @Input() commentId !: number
  @Input() currentUser : User | null = null
  @Output() close = new EventEmitter<void>()
  
  comment = new FormControl('')
  
  constructor(private store : Store) {
  }
  onCommentReply(){
    
    if(this.comment.value && this.comment.value?.length > 0){
      this.store.dispatch(articleActions.addReply({
        replyId : this.commentId,
        payload:{
          authorId: this.currentUser?.id!,
          content: this.comment.value
        }
      }))
    }
    
  }
}
