import {ChangeDetectionStrategy, Component, HostListener} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicFormModule} from '@ui-components';
import {DialogService, DialogType} from '@core';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from "primeng/messages";
import {DialogModule} from "primeng/dialog";
import {RegisterFormComponent} from "@auth/components/register-form/register-form.component";

@Component({
  selector: 'register-dialog',
  standalone: true,
  imports: [CommonModule, DynamicFormModule, ButtonModule, ToastModule, MessagesModule, DialogModule, RegisterFormComponent],
  templateUrl: './register-dialog-component.html',
  styleUrls: ['./register-dialog-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterDialogComponent {
  
  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) { this.closeDialog() }

  dialog$ = this.dialogService.dialog$

  constructor(public readonly dialogService : DialogService) {}
  
  closeDialog(){
    this.dialogService.closeDialog(DialogType.Register);
  }
  
}
