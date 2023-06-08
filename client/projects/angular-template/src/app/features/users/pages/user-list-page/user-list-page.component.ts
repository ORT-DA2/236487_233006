import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Field, FieldType, formsActions} from "@ui-components";
import {
  DIALOG_ACTION,
  DialogActionValue,
  DialogService,
  DialogType,
  ValidateAlphanumeric,
  ValidateEmail,
  ValidateNoWhitespace,
} from "@core";
import {userListActions} from "@users/+data-access/store/user-list/user-list.actions";
import {UserFormModel} from "@users/utils/types/user";
import {Store} from "@ngrx/store";
import {UserListComponent} from "@users/components/user-list/user-list.component";
import {User} from "@shared/domain";
import {ButtonModule} from "primeng/button";
import {DeleteDialogComponent} from "@shared/components/delete-dialog/delete-dialog.component";
import {UserDialogComponent} from "@users/components/user-dialog/user-dialog-component";
import {Validators} from "@angular/forms";

const structure: Field[] = [
  {
    type: FieldType.INVISIBLE,
    name: 'id',
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
    type: FieldType.SELECT,
    name: 'roles',
    label: 'Roles',
    validators: [Validators.required],
    select: {
      options: [
        { id: 1, description: 'Admin' },
        { id: 2, description: 'Blogger' },
      ],
    },
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
  selector: 'user-list-page',
  standalone: true,
  imports: [CommonModule, DeleteDialogComponent, UserListComponent, ButtonModule, UserDialogComponent],
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class UserListPageComponent implements OnInit, OnDestroy{
  
  constructor(private store : Store, private dialogService : DialogService) {}
  
  ngOnInit() {
    this.store.dispatch(formsActions.setStructure({ structure }))
  }
  
  onActionSelected(e: {selectedAction: DialogActionValue, user: User}) {
    if(e.selectedAction === DIALOG_ACTION.EDIT) this.onEditRequested(e.user);
    if(e.selectedAction === DIALOG_ACTION.DELETE) this.onDeleteRequested(e.user)
  }
  
  onEditRequested(user : User){
    this.store.dispatch(formsActions.setData({
      data: {
        ...user,
        roles : user.roles[0]
      }
    }))
    
    this.dialogService.openDialog(DialogType.User, {
      title: "Edit User",
      data : {
        edit : true
      }
    })
  }
  
  onDeleteRequested(user : User){
    this.dialogService.openDialog(DialogType.Delete, {
      title: "Delete User",
      text: `Are you sure you want to delete "${user.username}"?`,
      data: user.id
    })
  }
  
  onCreateRequested(){
    this.dialogService.openDialog(DialogType.User, {
      title: "Create User",
      data : {
        edit : false
      }
    })
  }
  
  onDeleteConfirmation(userId: number ){
    this.store.dispatch(userListActions.deleteUser({ userId }))
  }
  
  onUserSubmitted(user : UserFormModel){
    if(user.id) this.store.dispatch(userListActions.editUser({user}));
    else this.store.dispatch(userListActions.createNewUser({user}));
  }
  
  ngOnDestroy() {
    this.store.dispatch(userListActions.reset())
  }
}
