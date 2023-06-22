import {ChangeDetectionStrategy, Component, HostListener} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogService, DialogType} from "@core";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'admin-notification-dialog',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule],
  templateUrl: './admin-notification-dialog.component.html',
  styleUrls: ['./admin-notification-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminNotificationDialogComponent  {
  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closeDialog()
  }
  
  data  = this.dialogService.data
  
  constructor(private dialogService : DialogService, private router : Router)  {}
  
  
  closeDialog(){
    this.dialogService.closeDialog(DialogType.AdminNotification)
  }
  
  goToOffensiveArticles(){
    this.router.navigate(['/private','users', 'offensive-articles'])
    this.closeDialog()
  }
  
  goToOffensiveComments(){
    this.router.navigate(['/private','users', 'offensive-comments'])
    this.closeDialog()
  }
  
}
