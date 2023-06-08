import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DynamicFormModule, Field} from "@ui-components";
import {ButtonModule} from "primeng/button";
import {Article, User} from "@shared/domain";
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
  @Input() currentUser!: User;
  @Input() data$!: Observable<any>;
  @Input() structure$!: Observable<Field[]>;
  @Input() touchedForm$!: Observable<boolean>;
  
  @Output() submitComment: EventEmitter<{articleId: number, authorId: number}> = new EventEmitter();
  @Output() updateForm: EventEmitter<any> = new EventEmitter();
  
}
