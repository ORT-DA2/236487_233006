import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicFormModule, Field} from "@ui-components";
import {ButtonModule} from "primeng/button";
import {Article} from "@shared/domain";
import {Observable} from "rxjs";

@Component({
  selector: 'add-comment',
  standalone: true,
  imports: [CommonModule, DynamicFormModule, ButtonModule],
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCommentComponent {
  @Input() article!: Article;
  
  @Input() data$!: Observable<any>;
  @Input() structure$!: Observable<Field[]>;
  @Input() isLoggedUserAuthor = true;
  
  @Output() addComment: EventEmitter<{articleId: number, authorId: number}> = new EventEmitter();
  @Output() updateForm: EventEmitter<any> = new EventEmitter();
  
}
