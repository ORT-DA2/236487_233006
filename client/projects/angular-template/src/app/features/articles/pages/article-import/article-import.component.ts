import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  DynamicFormModule,
  Field,
  FieldType,
  formsActions,
  FormState,
  IDynamicForm,
  LoadingModule,
  ngrxFormsQuery,
} from "@ui-components";
import {articleFormQuery} from "@articles/+data-access/store/article-form/article-form.selectors";
import {Store} from "@ngrx/store";
import {ToastrService} from "ngx-toastr";
import {articleFormActions} from "@articles/+data-access/store/article-form/article-form.actions";
import {Validators} from "@angular/forms";
import {ErrorBadgeComponent} from "@shared/components/backend-error/error-badge.component";
import {ButtonModule} from "primeng/button";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";


@Component({
  selector: 'article-import',
  standalone: true,
  imports: [CommonModule, ErrorBadgeComponent, DynamicFormModule, ButtonModule, LoadingModule],
  templateUrl: './article-import.component.html',
  styleUrls: ['./article-import.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ArticleImportComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dynamicForm', { static: true }) dynamicForm!: IDynamicForm
  
  structure$ = this.store.select(ngrxFormsQuery.selectStructure)
  data$ = this.store.select(ngrxFormsQuery.selectData)
  loading$ = this.store.select(articleFormQuery.selectLoading)
  error$ = this.store.select(articleFormQuery.selectError)
  
  private componentDestroyed$ = new Subject<void>();
  
  
  constructor(private store: Store, private toast: ToastrService) {}
  
  ngOnInit() {
    this.store.dispatch(articleFormActions.loadImporterOptions())
  }
  
  ngAfterViewInit() {
    this.store
      .select(articleFormQuery.selectImporterOptions).pipe(takeUntil(this.componentDestroyed$))
      .subscribe((options) => {
        const structure: Field[] = [
          {
            type: FieldType.TEXT,
            name: 'filePath',
            label: 'Path',
            placeholder: "Path to your importer",
            validators: [Validators.required],
          },
          {
            type: FieldType.SELECT,
            name: 'importerName',
            label: 'Importer',
            validators: [Validators.required],
            placeholder: "Select An importer",
            select: {
              options
            }
          },
        ]
      
        this.store.dispatch(formsActions.setStructure({
          structure
        }));
      });
  }
  
  updateForm(state: FormState) {
    this.store.dispatch(formsActions.updateData({ state }))
  }
  
  submit() {
    this.dynamicForm.submitted()
    
    this.dynamicForm.form.valid
      ? this.store.dispatch(articleFormActions.importArticles())
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
  
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
