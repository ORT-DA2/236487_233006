import {ChangeDetectionStrategy, Component, inject, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserFormComponent} from "@users/components/user-form/user-form.component";
import {userListActions} from "@users/+data-access/store/user-list/user-list.actions";
import {Store} from "@ngrx/store";
import {UserFormModel} from "@users/utils/types/user";
import {Field, FieldType, formsActions, LoadingModule} from "@ui-components";
import {authQuery} from "@auth/+data-access/store/auth.selectors";
import {tap} from "rxjs/operators";
import {Validators} from "@angular/forms";
import {ValidateAlphanumeric, ValidateEmail, ValidateNoWhitespace} from "@core";
import {userActions} from "@users/+data-access/store/user/user.actions";
import {userQuery} from "@users/+data-access/store/user/user.selectors";
import {ErrorBadgeComponent} from "@shared/components/backend-error/error-badge.component";

const structure: Field[] = [
  {
    type: FieldType.INVISIBLE,
    name: 'id',
    label: ''
  },
  {
    type: FieldType.INVISIBLE,
    name: 'roles',
    label: ''
  },
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
    validators: [Validators.required, ValidateEmail, Validators.maxLength(100)],
    attrs: {
      type: 'email',
    },
  },
  {
    type: FieldType.TEXT,
    name: 'username',
    label: 'Username',
    validators: [Validators.required, ValidateAlphanumeric, Validators.maxLength(12)],
  },
  {
    type: FieldType.TEXT,
    name: 'password',
    label: 'Password',
    validators: [Validators.required, Validators.minLength(8), Validators.maxLength(100), ValidateNoWhitespace],
  },
]


@Component({
  selector: 'user-profile',
  standalone: true,
  imports: [CommonModule, UserFormComponent, ErrorBadgeComponent, LoadingModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class UserProfileComponent implements OnDestroy {
  private store = inject(Store)
  
  initUserForm$ = this.store.select(authQuery.selectLoggedUser).pipe(
    tap(() => this.store.dispatch(formsActions.setStructure({ structure }))),
    tap(data => this.store.dispatch(formsActions.setData({data})))
  )
  
  error$ = this.store.select(userQuery.selectError)
  loading$ = this.store.select(userQuery.selectLoading)
  
  onProfileSubmit(user : UserFormModel ){
    this.store.dispatch(userActions.editUserProfile({user}))
  }
  
  ngOnDestroy() {
    this.store.dispatch(userListActions.reset())
  }
}
