import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicFormModule, formsActions, FormState, FormStatus, IDynamicForm, ngrxFormsQuery} from "@ui-components";
import {UserForm, UserFormModel} from "@users/utils/types/user";
import {Store} from "@ngrx/store";
import {ToastrService} from "ngx-toastr";
import {FormControlStatus} from "@angular/forms";
import {take} from "rxjs/operators";
import {ButtonModule} from "primeng/button";
import {ErrorBadgeComponent} from "@shared/components/backend-error/error-badge.component";


@Component({
  selector: 'user-form',
  standalone: true,
  imports: [CommonModule, DynamicFormModule, ButtonModule, ErrorBadgeComponent],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements  OnDestroy {
  @ViewChild('dynamicForm', { static: true }) dynamicForm!: IDynamicForm
  @Output() submitted = new EventEmitter<UserFormModel>()
  
  structure$ = this.store.select(ngrxFormsQuery.selectStructure)
  data$ = this.store.select(ngrxFormsQuery.selectData)
  
  constructor(
    private readonly store: Store,
    private readonly toast: ToastrService,
  ) {}
  
  get form(): UserForm {
    return this.dynamicForm.form as UserForm
  }
  
  updateForm(state: FormState): void {
    this.store.dispatch(formsActions.updateData({ state }))
  }
  
  onSubmit() {
    this.dynamicForm.submitted();
    this.handleFormStatus(this.dynamicForm.form.status)
  }
  
  private handleFormStatus(status: FormControlStatus) {
    switch (status) {
      case FormStatus.VALID:
        this.handleValidForm()
        break
      case FormStatus.INVALID:
        this.handleInvalidForm()
        break
      case FormStatus.PENDING:
        this.handlePendingForm()
        break
    }
  }
  
  private handleValidForm() {
    const user: UserFormModel = this.form.value
    this.submitted.emit(user)
  }
  
  private handleInvalidForm() {
    this.toast.error('Form submission failed. Please correct the highlighted fields.', 'Error')
  }
  
  private handlePendingForm() {
    this.dynamicForm.form.statusChanges.pipe(take(1)).subscribe(this.handleFormStatus.bind(this))
  }
  
  
  ngOnDestroy() {
    this.store.dispatch(formsActions.resetForm())
  }
  
}
