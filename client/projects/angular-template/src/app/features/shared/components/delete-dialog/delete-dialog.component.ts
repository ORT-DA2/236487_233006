import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogPayload, DialogService, DialogType} from "@core";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {tap} from "rxjs/operators";

@Component({
  selector: 'delete-dialog',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule],
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteDialogComponent implements OnInit{
  @Output() deleted = new EventEmitter<any>();
  
  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closeDialog()
  }
  dialog$ = this.dialogService.dialog$.pipe(
    tap(() => this.payload = this.dialogService.payload),
  )
  
  payload : DialogPayload | null = null
  
  constructor(private dialogService : DialogService)  {}
  
  
  ngOnInit() {
 
  }
  
  onDelete(){
    this.deleted.emit(this.payload?.data)
  }
  
  closeDialog(){
    this.dialogService.closeDialog(DialogType.Delete)
  }
  
}
