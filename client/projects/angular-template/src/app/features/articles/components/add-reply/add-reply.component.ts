import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextAreaFieldModule} from "@ui-components";
import {ButtonModule} from "primeng/button";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'add-reply',
  standalone: true,
  imports: [CommonModule, TextAreaFieldModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './add-reply.component.html',
  styleUrls: ['./add-reply.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddReplyComponent {
  @Output() close = new EventEmitter<void>()
  @Output() replied = new EventEmitter<string>()
  
  comment = new FormControl('')

  onCommentReply(){
    if(this.isValidReply()){
     this.replied.emit(this.comment.value!)
    }
  }
  
  private isValidReply(): boolean {
    return !!(this.comment.value && this.comment.value.length > 0);
  }
}
