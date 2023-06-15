import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {userListQuery} from "@users/+data-access/store/user-list/user-list.selectors";
import {User} from "@shared/domain";
import {Store} from "@ngrx/store";
import {TableModule} from "primeng/table";
import {DynamicFormModule, Field, FieldType, formsActions, LoadingModule} from "@ui-components";
import {ButtonModule} from "primeng/button";
import {ErrorBadgeComponent} from "@shared/components/backend-error/error-badge.component";
import {userListActions} from "@users/+data-access/store/user-list/user-list.actions";
import {Validators} from "@angular/forms";
import {UserFormComponent} from "@users/components/user-form/user-form.component";
import {combineLatest, Observable} from "rxjs";
import {UserListVM} from "@users/components/user-list/user-list.component";


const structure: Field[] = [
  {
    type: FieldType.DATE,
    name: 'startDate',
    label: 'Start from',
    placeholder: "Select a start date",
    validators: [Validators.required],
  },
  {
    type: FieldType.DATE,
    name: 'endDate',
    label: 'To',
    validators: [Validators.required],
    placeholder: "Select a final date",
  },
]

@Component({
  selector: 'users-ranking',
  standalone: true,
  imports: [CommonModule, TableModule, LoadingModule, ButtonModule, DynamicFormModule, ErrorBadgeComponent, UserFormComponent],
  templateUrl: './users-ranking.component.html',
  styleUrls: ['./users-ranking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class UsersRankingComponent implements OnInit{
  vm$ : Observable<UserListVM> = combineLatest({
    entities : this.store.select(userListQuery.selectEntities),
    loading : this.store.select(userListQuery.selectLoading),
    error : this.store.select(userListQuery.selectError)
  })
  
  // Trick to add type safety to context
  $ = (item: User) => item;
  
  constructor(private store : Store) {}
  
  ngOnInit() {
    this.store.dispatch(formsActions.setStructure({ structure }))
  }
  
  onSubmit() {
    this.store.dispatch(userListActions.loadUsersRanking())
  }
  
  ngOnDestroy() {
    this.store.dispatch(userListActions.reset())
  }
}
