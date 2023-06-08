import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from "primeng/table";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {LoadingModule} from "@ui-components";
import {ListboxModule} from "primeng/listbox";
import {FormsModule} from "@angular/forms";
import {UserListActionsComponent} from "@users/components/user-list-actions/user-list-actions.component";
import {Store} from "@ngrx/store";
import {userListQuery} from "@users/+data-access/store/user-list/user-list.selectors";
import {TagModule} from "primeng/tag";
import {DIALOG_ACTION, DialogActionValue, RoleType} from "@core";
import {DialogModule} from "primeng/dialog";
import {DeleteDialogComponent} from "@shared/components/delete-dialog/delete-dialog.component";
import {User} from "@shared/domain";


@Component({
  selector: 'user-list',
  standalone: true,
  imports: [CommonModule, TableModule, OverlayPanelModule, ListboxModule, FormsModule, UserListActionsComponent, TagModule, DialogModule, DeleteDialogComponent, LoadingModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  users$ = this.store.select(userListQuery.selectUsers)
  loading$ = this.store.select(userListQuery.selectLoading)
  
  @Output() actionEvent: EventEmitter<{selectedAction: DialogActionValue, user: User}> = new EventEmitter();
  
  // Trick to add type safety to context
  $ = (item: User) => item;
  
  constructor(private store : Store) {}
  
  isAdmin(user: User): string {
    if(user.roles.some(role => role === RoleType.Admin)) {
      return "admin";
    }
    return "blogger";
  }
  
  onActionSelected(selectedAction : DialogActionValue, user : User){
    if(selectedAction === DIALOG_ACTION.EDIT) this.actionEvent.emit({selectedAction, user});
    if(selectedAction === DIALOG_ACTION.DELETE) this.actionEvent.emit({selectedAction, user});
  }
  
}
