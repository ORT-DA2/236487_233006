import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListboxModule} from "primeng/listbox";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {FormsModule} from "@angular/forms";
import {ActionSelected, DIALOG_ACTION, DialogAction, DialogActionValue} from "@core";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'user-list-actions',
  standalone: true,
  imports: [CommonModule, ListboxModule, OverlayPanelModule, FormsModule, ButtonModule],
  templateUrl: './user-list-actions.component.html',
  styleUrls: ['./user-list-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListActionsComponent {
  
  @Output() actionSelected = new EventEmitter<DialogActionValue>();
  
  actions: DialogAction[] = [
    {label: 'Edit', value: DIALOG_ACTION.EDIT},
    {label: 'Delete', value: DIALOG_ACTION.DELETE},
  ];
  
  selectedAction: DialogAction | null = null;
  
  onActionSelected(event : ActionSelected) {
    this.actionSelected.emit(event.value)
  }
}
