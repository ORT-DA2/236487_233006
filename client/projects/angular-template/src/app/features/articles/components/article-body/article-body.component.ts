import {ChangeDetectionStrategy, Component, Input} from '@angular/core'
import {CommonModule, NgOptimizedImage} from '@angular/common'
import {DynamicFormModule, LoadingModule} from '@ui-components'
import {ImagePosition} from '@core'
import {Article, OffensiveWord, User} from "@shared/domain";
import {AddCommentComponent} from "@articles/components/add-comment/add-comment.component";
import {HighlightDirective} from "@shared/highlight-directive";
import {Observable} from "rxjs";


@Component({
  selector: 'article-body',
  standalone: true,
  imports: [CommonModule, LoadingModule, NgOptimizedImage, DynamicFormModule, AddCommentComponent, HighlightDirective],
  templateUrl: './article-body.component.html',
  styleUrls: ['./article-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleBodyComponent {
  @Input() article !: Article
  @Input() words$ !: Observable<OffensiveWord[]>
  imagePosition = ImagePosition
}

/*
{
  type: FieldType.TEXT,
    label: 'Password',
  name: 'password',
  validators: [Validators.required],
  hide(form: FormGroup): boolean {
  return form.controls['email'].value === '';
},
},
*/
