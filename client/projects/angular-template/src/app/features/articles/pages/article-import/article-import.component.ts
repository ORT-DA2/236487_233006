import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DynamicFormModule,
  Field,
  FieldType,
  formsActions,
  FormState,
  IDynamicForm, LoadingModule,
  ngrxFormsQuery,
} from "@ui-components";
import {articleFormQuery} from "@articles/+data-access/store/article-form/article-form.selectors";
import {Store} from "@ngrx/store";
import {ToastrService} from "ngx-toastr";
import {articleQuery} from "@articles/+data-access/store/article/article.selectors";
import {first} from "rxjs/operators";
import {noop} from "rxjs";
import {articleFormActions} from "@articles/+data-access/store/article-form/article-form.actions";
import {Article} from "@shared/domain";
import {articleActions} from "@articles/+data-access/store/article/article.actions";
import {Validators} from "@angular/forms";
import {ErrorBadgeComponent} from "@shared/components/backend-error/error-badge.component";
import {ButtonModule} from "primeng/button";
import {TemplateOption} from "@articles/utils/types/article-form";

const structure: Field[] = [
  {
    type: FieldType.TEXT,
    name: 'title',
    label: 'Title',
    placeholder: "Title",
    validators: [Validators.required],
  },
  {
    type: FieldType.SELECT,
    name: 'importer',
    label: 'Importer',
    validators: [Validators.required],
    placeholder: "Select An importer",
    select: {
      options: [],
    },
  },
]

@Component({
  selector: 'article-import',
  standalone: true,
  imports: [CommonModule, ErrorBadgeComponent, DynamicFormModule, ButtonModule, LoadingModule],
  templateUrl: './article-import.component.html',
  styleUrls: ['./article-import.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ArticleImportComponent implements OnInit, OnDestroy {
  @ViewChild('dynamicForm', { static: true }) dynamicForm!: IDynamicForm
  
  structure$ = this.store.select(ngrxFormsQuery.selectStructure)
  data$ = this.store.select(ngrxFormsQuery.selectData)
  loading$ = this.store.select(articleFormQuery.selectLoading)
  error$ = this.store.select(articleFormQuery.selectError)
  
  constructor(private store: Store, private toast: ToastrService) {}
  
  ngOnInit() {
    this.store.dispatch(articleFormActions.loadImporterOptions())
    this.store.dispatch(formsActions.setStructure({ structure }))
    
    // If editing patchValue
    this.store
      .select(articleFormQuery.selectImporterOptions)
      .pipe(first())
      .subscribe((options) => {
          this.store.dispatch(formsActions.setData({ data: {
            importer : options
            } }))
      })
  }
  
  updateForm(state: FormState) {
    this.store.dispatch(formsActions.updateData({ state }))
  }
  
  submit() {
    this.dynamicForm.submitted()
    
    this.dynamicForm.form.valid
      ? this.store.dispatch(articleFormActions.publishArticle())
      : this.handleInvalidForm()
  }
  

  
  private handleInvalidForm() {
    this.toast.error(
      'Form submission failed. Please correct the highlighted fields.',
      'Error'
    )
  }
  
  ngOnDestroy() {
    this.store.dispatch(articleFormActions.reset())
    this.store.dispatch(formsActions.resetForm())
  }
}
