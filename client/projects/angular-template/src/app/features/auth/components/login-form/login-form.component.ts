import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DynamicFormModule, Field, FieldType, FormState, IDynamicForm, LoadingModule} from '@ui-components'
import {Validators} from '@angular/forms'
import {ValidateAlphanumeric, ValidateEmail, ValidateNoWhitespace} from '@core'
import {ButtonModule} from 'primeng/button'
import {takeUntil} from 'rxjs/operators'
import {authActions} from '@auth/+data-access/store/auth.actions'
import {authQuery} from '@auth/+data-access/store/auth.selectors'
import {Store} from '@ngrx/store'
import {Subject} from 'rxjs'
import {ToastrService} from 'ngx-toastr'
import {MessagesModule} from 'primeng/messages'
import {RippleModule} from 'primeng/ripple'
import {OptionID, LoginForm} from "@auth/utils/types/login";

const structure: Field[] = [
  {
    type: FieldType.SELECT,
    name: 'option',
    label: 'Usuario/email',
    select: {
      options: [
        { id: OptionID.EMAIL, description: 'email' },
        { id: OptionID.USERNAME, description: 'username' },
      ],
    },
  },
  {
    type: FieldType.TEXT,
    name: 'id',
    label: 'ID',
    placeholder: 'Usuario/Email',
    validators: [Validators.required, ValidateEmail, Validators.maxLength(100)],
  },
  {
    type: FieldType.TEXT,
    name: 'password',
    label: 'Password',
    validators: [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100),
      ValidateNoWhitespace,
    ],
    placeholder: 'Password',
    attrs: {
      type: 'password',
    },
  },
]

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DynamicFormModule,
    MessagesModule,
    RippleModule,
    LoadingModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dynamicForm', { static: true }) dynamicForm!: IDynamicForm

  structure$ = this.store.select(authQuery.selectLoginStructure)
  data$ = this.store.select(authQuery.selectLoginData)
  error$ = this.store.select(authQuery.selectError)

  private componentDestroyed$ = new Subject<void>()


  get form(): LoginForm {
    return this.dynamicForm.form as LoginForm
  }

  constructor(private readonly store: Store, private readonly toast: ToastrService) {}

  ngOnInit() {
    this.buildForm()
  }

  ngAfterViewInit(): void {
    this.patchSelect()
    this.watchForSelectChange()
  }

  submit(): void {
    this.dynamicForm.submitted()

    if (this.form.valid) this.store.dispatch(authActions.login())
    else this.handleInvalidForm()
  }

  updateForm(state: FormState): void {
    this.store.dispatch(authActions.updateLoginData({ state }))
  }

  private buildForm() {
    this.store.dispatch(authActions.setLoginStructure({ structure }))
  }

  private patchSelect() {
    this.form.controls.option.patchValue(OptionID.EMAIL)
  }

  private updateIdValidators() {
    this.form.controls.id.clearValidators()
    this.form.controls.option.value === OptionID.EMAIL ? this.setEmailValidators() : this.setUsernameValidators()
    this.form.controls.id.updateValueAndValidity()
  }

  private setEmailValidators() {
    this.form.controls.id.setValidators([
      ValidateEmail,
      Validators.required,
      Validators.maxLength(100),
    ])
  }

  private setUsernameValidators() {
    this.form.controls.id.setValidators([
      ValidateAlphanumeric,
      Validators.maxLength(12),
      Validators.required,
    ])
  }

  private handleInvalidForm() {
    this.toast.error('Form submission failed. Please correct the highlighted fields.', 'Error')
  }

  private watchForSelectChange() {
    this.form.controls.option.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => {
        this.form.controls.id.patchValue('')
        this.updateIdValidators()
      })
  }

  ngOnDestroy() {
    this.form.reset()
    this.componentDestroyed$.next()
    this.componentDestroyed$.complete()
  }
}
