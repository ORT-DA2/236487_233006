import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	DynamicFormModule,
	Field,
	FieldType,
	formsActions,
	FormState,
	FormStatus,
	IDynamicForm,
	ngrxFormsQuery,
} from "@ui-components";
import {RegisterForm, RegisterFormModel} from "@auth/utils/types/register";
import {authQuery} from "@auth/+data-access/store/auth.selectors";
import {Store} from "@ngrx/store";
import {UserValidationService} from "@shared/services/user-validation.service";
import {ToastrService} from "ngx-toastr";
import {ValidateAlphanumeric, ValidateEmail, ValidateNoWhitespace} from "@core";
import {UniqueEmailValidator} from "@auth/utils/validators/unique-email.validator";
import {UniqueUsernameValidator} from "@auth/utils/validators/unique-username.validator";
import {Validators} from "@angular/forms";
import {CheckPasswordsMatch} from "@auth/utils/validators/passwords-match.validator";
import {filter, startWith} from "rxjs";
import {first} from "rxjs/operators";
import {authActions} from "@auth/+data-access/store/auth.actions";
import {MessagesModule} from "primeng/messages";
import {ButtonModule} from "primeng/button";
import {ErrorBadgeComponent} from "@shared/components/backend-error/error-badge.component";

@Component({
  selector: 'register-form',
  standalone: true,
  imports: [CommonModule, DynamicFormModule, MessagesModule, ButtonModule, ErrorBadgeComponent],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {
  @ViewChild('dynamicForm', {static: true}) dynamicForm!: IDynamicForm;
  
  structure$ = this.store.select(ngrxFormsQuery.selectStructure);
  data$ = this.store.select(ngrxFormsQuery.selectData);
  error$ = this.store.select(authQuery.selectRegisterError)
  
  constructor(
    private readonly store: Store,
    private readonly registerService: UserValidationService,
    private readonly toast: ToastrService,
    private uniqueEmailValidator: UniqueEmailValidator,
    private uniqueUsernameValidator: UniqueUsernameValidator
  ) {
  }
  
  
  ngOnInit(): void {
    this.initForm();
  }
  
  get form(): RegisterForm {
    return this.dynamicForm.form as RegisterForm;
  }
  
  updateForm(state: FormState): void {
    this.store.dispatch(formsActions.updateData({state}));
  }
  
  onSubmit() {
    this.dynamicForm.submitted();
    
    this.form.statusChanges.pipe(
      startWith(this.form.status),
      filter(status => status === FormStatus.VALID || status === FormStatus.INVALID),
      first()
    ).subscribe(status => status === FormStatus.VALID ? this.emitFormValue() : this.showFormError());
  }
  
  private emitFormValue() {
    const newUser: RegisterFormModel = this.form.value;
    this.store.dispatch(authActions.register({ newUser }))
  }
  
  private showFormError() {
    this.toast.error('Form submission failed. Please correct the highlighted fields.', 'Error');
  }
  
  private initForm(){
    const structure: Field[] = [
      {
        type: FieldType.TEXT,
        name: 'firstName',
        label: 'First Name',
        validators: [Validators.required, Validators.maxLength(50)],
      },
      {
        type: FieldType.TEXT,
        name: 'lastName',
        label: 'Last Name',
        validators: [Validators.required, Validators.maxLength(50)],
      },
      {
        type: FieldType.TEXT,
        name: 'email',
        label: 'Email',
        validators: [Validators.required, ValidateEmail, Validators.maxLength(100),],
        asyncValidators: [this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator)],
        attrs: {
          type: "email"
        },
      },
      {
        type: FieldType.TEXT,
        name: 'username',
        label: 'Username',
        validators: [Validators.required, ValidateAlphanumeric, Validators.maxLength(12)],
        asyncValidators: [this.uniqueUsernameValidator.validate.bind(this.uniqueUsernameValidator)],
      },
      {
        type: FieldType.TEXT,
        name: 'password',
        label: 'Password',
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(100), ValidateNoWhitespace],
        attrs: {
          type: "password"
        },
      },
      {
        type: FieldType.TEXT,
        name: 'passwordConfirmation',
        label: 'Password confirmation',
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(100), ValidateNoWhitespace],
        attrs: {
          type: "password"
        },
        groupErrors: [
          {type: 'passwordsNotMatch', message: 'Passwords should match'}
        ]
      },
      {
        type: FieldType.FORM_GROUP,
        name: null,
        validators: [CheckPasswordsMatch],
      },
    ];
  
    this.store.dispatch(formsActions.setStructure({structure}));
  }
  
  ngOnDestroy() {
    this.store.dispatch(formsActions.destroyForm());
    this.store.dispatch(authActions.resetRegister());
  }
}
