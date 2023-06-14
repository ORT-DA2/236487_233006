import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {userListQuery} from "@users/+data-access/store/user-list/user-list.selectors";
import {RoleType} from "@core";
import {User} from "@shared/domain";
import {Store} from "@ngrx/store";
import {TableModule} from "primeng/table";
import {
  DynamicFormModule,
  Field, FieldType,
  formsActions,
  FormState,
  IDynamicForm,
  LoadingModule,
  ngrxFormsQuery,
} from "@ui-components";
import {UserService} from "@users/+data-access/services/user.service";
import {ButtonModule} from "primeng/button";
import {ErrorBadgeComponent} from "@shared/components/backend-error/error-badge.component";
import {articleFormActions} from "@articles/+data-access/store/article-form/article-form.actions";
import {userListActions} from "@users/+data-access/store/user-list/user-list.actions";
import {ToastrService} from "ngx-toastr";
import {Validators} from "@angular/forms";


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
  imports: [CommonModule, TableModule, LoadingModule, ButtonModule, DynamicFormModule, ErrorBadgeComponent],
  templateUrl: './users-ranking.component.html',
  styleUrls: ['./users-ranking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class UsersRankingComponent implements OnInit{
  @ViewChild('dynamicForm', { static: true }) dynamicForm!: IDynamicForm
  
  structure$ = this.store.select(ngrxFormsQuery.selectStructure)
  data$ = this.store.select(ngrxFormsQuery.selectData)
  
  users$ = this.store.select(userListQuery.selectEntities)
  loading$ = this.store.select(userListQuery.selectLoading)
  error$ = this.store.select(userListQuery.selectError)
  
  // Trick to add type safety to context
  $ = (item: User) => item;
  
  constructor(private store : Store , private userService : UserService, private toast: ToastrService) {}
  
  ngOnInit() {
    this.store.dispatch(formsActions.setStructure({ structure }))
  }
  
  updateForm(state: FormState) {
    this.store.dispatch(formsActions.updateData({ state }))
  }
  
  submit() {
    this.dynamicForm.submitted()
    
    this.dynamicForm.form.valid
      ? this.store.dispatch(userListActions.loadUsersRanking())
      : this.handleInvalidForm()
  }
  
  private handleInvalidForm() {
    this.toast.error(
      'Form submission failed. Please correct the highlighted fields.',
      'Error'
    )
  }
  
  
  ngOnDestroy() {
    this.store.dispatch(userListActions.reset())
    this.store.dispatch(formsActions.resetForm())
  }
}
