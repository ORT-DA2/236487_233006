import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogService, DialogType} from "@core";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";

@Component({
  selector: 'delete-dialog',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule],
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteDialogComponent {
  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closeDialog()
  }
  
  @Output() deleted = new EventEmitter<any>();
  
  constructor(public dialogService : DialogService)  {}
  
  closeDialog(){
    this.dialogService.closeDialog(DialogType.Delete)
  }
  
}
