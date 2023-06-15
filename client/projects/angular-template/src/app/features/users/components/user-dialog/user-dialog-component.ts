import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DynamicFormModule} from '@ui-components'
import {DialogService, DialogType} from '@core'
import {ButtonModule} from 'primeng/button'
import {ToastModule} from 'primeng/toast'
import {MessagesModule} from "primeng/messages";
import {DialogModule} from "primeng/dialog";
import {UserFormComponent} from "@users/components/user-form/user-form.component";
import {UserFormModel} from "@users/utils/types/user";
import {ErrorBadgeComponent} from "@shared/components/backend-error/error-badge.component";
import {Observable} from "rxjs";


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
  
  @Input() error$ !: Observable<string | null>
  @Output() userEdited = new EventEmitter<UserFormModel>()
  @Output() userCreated = new EventEmitter<UserFormModel>()
  
  dialog$ = this.dialogService.dialog$
  
  constructor(public readonly dialogService : DialogService) {}
  
  closeDialog() {
    this.dialogService.closeDialog(DialogType.User)
  }
  
  onUserSubmitted(user : UserFormModel ){
    if(this.dialogService.data.edit) this.userEdited.emit(user)
    else this.userCreated.emit(user)
  }
}
