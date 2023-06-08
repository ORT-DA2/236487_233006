import {ChangeDetectionStrategy, Component, HostListener} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DynamicFormModule} from '@ui-components'
import {DialogService, DialogType} from '@core'
import {ButtonModule} from 'primeng/button'
import {ToastModule} from 'primeng/toast'
import {MessagesModule} from "primeng/messages";
import {DialogModule} from "primeng/dialog";
import {UserFormComponent} from "@users/components/user-form/user-form.component";
import {UserFormModel} from "@users/utils/types/user";
import {Store} from "@ngrx/store";
import {userListActions} from "@users/+data-access/store/user-list/user-list.actions";
import {userListQuery} from "@users/+data-access/store/user-list/user-list.selectors";
import {ErrorBadgeComponent} from "@shared/components/backend-error/error-badge.component";


@Component({
  selector: 'user-dialog',
  standalone: true,
  imports: [CommonModule, DynamicFormModule, ButtonModule, ToastModule, MessagesModule, DialogModule, UserFormComponent, ErrorBadgeComponent],
  templateUrl: './user-dialog-component.html',
  styleUrls: ['./user-dialog-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDialogComponent {
  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closeDialog()
  }
  
  error$ = this.store.select(userListQuery.selectDialogError)
  dialog$ = this.dialogService.dialog$
  
  constructor(
    private readonly store : Store,
    public readonly dialogService : DialogService
  ) {}
  
  
  closeDialog() {
    this.dialogService.closeDialog(DialogType.User)
  }
  
  onUserSubmit(user : UserFormModel ){
    if(this.dialogService.data.edit) this.store.dispatch(userListActions.editUser({user}))
    else this.store.dispatch(userListActions.createNewUser({user}))
  }
}
