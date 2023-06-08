import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {CommonModule} from '@angular/common'
import {
  CheckboxFieldModule,
  DynamicFormModule,
  Field,
  FieldType,
  formsActions,
  FormState,
  IDynamicForm,
  LoadingModule,
  ngrxFormsQuery,
} from '@ui-components'
import {ReactiveFormsModule, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {ButtonModule} from 'primeng/button'
import {articleFormActions} from '@articles/+data-access/store/article-form/article-form.actions'
import {articleFormQuery} from '@articles/+data-access/store/article-form/article-form.selectors'
import {ToastrService} from 'ngx-toastr'
import {MessagesModule} from 'primeng/messages'
import {articleQuery} from '@articles/+data-access/store/article/article.selectors'
import {first} from 'rxjs/operators'
import {articleActions} from '@articles/+data-access/store/article/article.actions'
import {ErrorBadgeComponent} from '@shared/components/backend-error/error-badge.component'

import {noop} from 'rxjs'
import {Article} from '@shared/domain'
import {CheckImageQuantityOK} from "@articles/utils/validators/image-quantity-ok.validator";
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
    type: FieldType.TEXTAREA,
    name: 'content',
    label: 'Content',
    validators: [Validators.required],
    placeholder: "What's this article about?",
  },
  {
    type: FieldType.SELECT,
    name: 'template',
    label: 'Image Position',
    validators: [Validators.required],
    placeholder: "Select image position",
    select: {
      options: [
        { id: TemplateOption.BOTTOM, description: 'Bottom' },
        { id: TemplateOption.LEFT, description: 'Left' },
        { id: TemplateOption.TOP, description: 'Top' },
        { id: TemplateOption.TOP_AND_BOTTOM, description: 'Top and Bottom' },
      ],
    },
  },
  {
    type: FieldType.CHECK,
    name: 'private',
    label: 'Private article',
  },
  {
    type: FieldType.FILE_UPLOAD,
    name: 'image',
    label: 'Article Image',
    placeholder: 'Only images allowed',
    validators: [Validators.required],
    groupErrors: [
      {type: "imageQuantityExceeded", message : "Image quantity exceeded" },
      {type: "requiredImagesMissing", message : "Required images missing" }
    ],
    file: {
      accept: 'image/*',
    },
  },
  {
    type: FieldType.FORM_GROUP,
    name: null,
    validators: [CheckImageQuantityOK],
  },
]

@Component({
  selector: 'article-form',
  standalone: true,
  imports: [
    CommonModule,
    DynamicFormModule,
    ButtonModule,
    CheckboxFieldModule,
    ReactiveFormsModule,
    MessagesModule,
    LoadingModule,
    ErrorBadgeComponent,
  ],
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticleFormComponent implements OnInit, OnDestroy {
  @ViewChild('dynamicForm', { static: true }) dynamicForm!: IDynamicForm

  structure$ = this.store.select(ngrxFormsQuery.selectStructure)
  data$ = this.store.select(ngrxFormsQuery.selectData)
  loading$ = this.store.select(articleFormQuery.selectLoading)
  error$ = this.store.select(articleFormQuery.selectError)

  editing = false
  constructor(private store: Store, private toast: ToastrService) {}

  ngOnInit() {
    this.store.dispatch(formsActions.setStructure({ structure }))

    // If editing patchValue
    this.store
      .select(articleQuery.selectData)
      .pipe(first())
      .subscribe((article) => {
        article
          ? this.store.dispatch(
              formsActions.setData({ data: this.getFormData(article) })
            )
          : noop
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

  // If Im editing, patch article data
  private getFormData(article: Article) {
    this.editing = true
    const images = []
    if(article.firstImage){
      images.push( {
        data: article.firstImage,
        category: 'image',
        name: 'Image 1',
      },)
    }
    if(article.secondImage)
      images.push( {
        data: article.secondImage,
        category: 'image',
        name: 'Image 2',
      },)
    
    return {
      ...article,
      image: images
    }
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

    if (this.editing) this.store.dispatch(articleActions.reset())
  }
}
