import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {
  DynamicFormModule,
  Field,
  FieldType,
  formsActions,
  FormState,
  LoadingModule,
  ngrxFormsQuery,
} from '@ui-components'
import {articleFormQuery} from '@articles/+data-access/store/article-form/article-form.selectors'
import {Store} from '@ngrx/store'
import {articleFormActions} from '@articles/+data-access/store/article-form/article-form.actions'
import {Validators} from '@angular/forms'
import {ErrorBadgeComponent} from '@shared/components/backend-error/error-badge.component'
import {ButtonModule} from 'primeng/button'
import {map, Observable, of, Subject} from 'rxjs'
import {ArticleFormComponent} from "@articles/components/article-form/article-form.component";
import {ArticleService} from "@articles/+data-access/services/article.service";


@Component({
  selector: 'article-import',
  standalone: true,
  imports: [
    CommonModule,
    ErrorBadgeComponent,
    DynamicFormModule,
    ButtonModule,
    LoadingModule,
    ArticleFormComponent,
  ],
  templateUrl: './article-import.component.html',
  styleUrls: ['./article-import.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticleImportComponent implements OnInit, OnDestroy {

  structure$ = this.store.select(ngrxFormsQuery.selectStructure)
  data$ = this.store.select(ngrxFormsQuery.selectData)
  loading$ = this.store.select(articleFormQuery.selectLoading)
  error$ = this.store.select(articleFormQuery.selectError)
  
  private componentDestroyed$ = new Subject<void>()

  constructor(private store: Store, private articleService : ArticleService ) {}
  
  ngOnInit() {
    this.store.dispatch(articleFormActions.loadImporterOptions())
    const structure: Field[] = [
      {
        type: FieldType.TEXT,
        name: 'filePath',
        label: 'Path',
        placeholder: 'Path to your importer',
        validators: [Validators.required],
      },
      {
        type: FieldType.SELECT,
        name: 'importerName',
        label: 'Importer',
        validators: [Validators.required],
        placeholder: 'Select An importer',
        select: {
          options$: this.store.select(articleFormQuery.selectImporterOptions)
        },
      },
    ]
    
    this.store.dispatch(formsActions.setStructure({structure}))
  }
  
  onUpdate(state: FormState) {
    this.store.dispatch(formsActions.updateData({ state }))
  }
  
  onSubmit(){
    this.store.dispatch(articleFormActions.importArticles())
  }

  ngOnDestroy() {
    this.store.dispatch(formsActions.resetForm())
    this.componentDestroyed$.next()
    this.componentDestroyed$.complete()
  }
}
