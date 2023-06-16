import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicFormModule, Field, IDynamicForm} from "@ui-components";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'article-form',
  standalone: true,
  imports: [CommonModule, DynamicFormModule, ButtonModule],
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleFormComponent  {
  @ViewChild('dynamicForm', { static: true }) dynamicForm!: IDynamicForm
  
  @Input() structure$!: Observable<Field[]>;
  @Input() data$!: Observable<any>;
  
  @Input() buttonLabel = "submit"
  @Input() buttonSpinner$ !: Observable<boolean>
  
  @Output() submitted: EventEmitter<void> = new EventEmitter();
  @Output() updatedForm: EventEmitter<any> = new EventEmitter();
  
  constructor(private toast: ToastrService) {}
  
  submit() {
    this.dynamicForm.submitted()
    this.dynamicForm.form.valid ? this.submitted.emit() : this.handleInvalidForm()
  }
  
  private handleInvalidForm() {
    this.toast.error(
      'Form submission failed. Please correct the highlighted fields.',
      'Error'
    )
  }
  
}

