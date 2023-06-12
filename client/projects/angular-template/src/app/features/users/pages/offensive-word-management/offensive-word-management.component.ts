import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  DynamicFormModule,
  Field,
  FieldType,
  formsActions,
  FormState,
  IDynamicForm, LoadingModule,
  ngrxFormsQuery,
} from "@ui-components";
import {ErrorBadgeComponent} from "@shared/components/backend-error/error-badge.component";
import {Store} from "@ngrx/store";
import {ToastrService} from "ngx-toastr";
import {ButtonModule} from "primeng/button";
import {Observable, of} from "rxjs";
import {ListboxModule} from "primeng/listbox";
import {ValidateAlphanumeric, ValidateNoWhitespace} from "@core";
import {wordsActions} from "@users/+data-access/store/offensive-words/offensive-words.actions";
import {wordsQuery} from "@users/+data-access/store/offensive-words/offensive-words.selectors";
import {OffensiveWord, User} from "@shared/domain";

const structure: Field[] = [
  {
    type: FieldType.TEXT,
    name: 'word',
    label: 'Offensive word',
    placeholder: 'Add an offensive word',
    validators: [ValidateAlphanumeric]
  },
]

@Component({
  selector: 'offensive-word-management',
  standalone: true,
  imports: [CommonModule, DynamicFormModule, ErrorBadgeComponent, ButtonModule, ListboxModule, LoadingModule],
  templateUrl: './offensive-word-management.component.html',
  styleUrls: ['./offensive-word-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class OffensiveWordManagementComponent implements OnInit, OnDestroy {
  @ViewChild('dynamicForm', { static: true }) dynamicForm!: IDynamicForm
  
  words$ : Observable<OffensiveWord[]> = this.store.select(wordsQuery.selectEntities)
  loading$ = this.store.select(wordsQuery.selectLoading)
  error$ = this.store.select(wordsQuery.selectError)
  
  structure$ = this.store.select(ngrxFormsQuery.selectStructure)
  data$ = this.store.select(ngrxFormsQuery.selectData)
  
  // Trick to add type safety to context
  w$ = (item: OffensiveWord) => item;
  
  constructor(private store: Store, private toast: ToastrService) {}
  
  ngOnInit() {
    this.store.dispatch(wordsActions.loadWords())
    this.store.dispatch(formsActions.setStructure({ structure }))
  }
  
  submit() {
    this.dynamicForm.submitted()
    
    const word = this.dynamicForm.form.controls['word'].value
    this.dynamicForm.form.valid ? this.store.dispatch(wordsActions.createWord({word})) : this.handleInvalidForm()
  }
  
  updateForm(state: FormState) {
    this.store.dispatch(formsActions.updateData({ state }))
  }
  
  private handleInvalidForm() {
    this.toast.error(
      'Form submission failed. Please correct the highlighted fields.',
      'Error'
    )
  }
  
  ngOnDestroy() {
    this.store.dispatch(formsActions.destroyForm())
  }
  
  deleteOffensiveWord(id : number){
    this.store.dispatch(wordsActions.deleteWord({id}))
  }
}
