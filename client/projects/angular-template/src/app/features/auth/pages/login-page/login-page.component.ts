import {ChangeDetectionStrategy, Component} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterLink} from '@angular/router'
import {DynamicFormModule, LoadingModule, NumberFieldModule} from '@ui-components'
import {CheckboxModule} from 'primeng/checkbox'
import {ButtonModule} from 'primeng/button'
import {RippleModule} from 'primeng/ripple'
import {DialogService, DialogType} from '@core'
import {DialogModule} from 'primeng/dialog'
import {LoginFormComponent} from '@auth/components/login-form/login-form.component'
import {authQuery} from '@auth/+data-access/store/auth.selectors'
import {Store} from '@ngrx/store'

import {RegisterDialogComponent} from "@auth/components/register-dialog/register-dialog-component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NumberFieldModule,
    DynamicFormModule,
    CheckboxModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    LoginFormComponent,
    LoadingModule,
    RegisterDialogComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPageComponent {
  loading$ = this.store.select(authQuery.selectLoading)

  constructor(
    private readonly dialogManager: DialogService,
    private readonly store: Store
  ) {}

  openRegisterDialog(): void {
    this.dialogManager.openDialog(DialogType.Register, {
      title: 'Register',
    })
  }
}
