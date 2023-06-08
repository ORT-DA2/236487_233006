import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core'
import {CommonModule} from '@angular/common'
import {
	DynamicFormModule,
	Field,
	FieldType,
	formsActions,
	FormState,
	IDynamicForm,
	ngrxFormsQuery,
} from '@ui-components'
import {Store} from '@ngrx/store'

const structure: Field[] = [
  {
    type: FieldType.TEXT,
    name: 'filterBy',
    label: 'Filter By:',
    placeholder: 'Search for specific articles',
  },
]

@Component({
  selector: 'filter-articles',
  standalone: true,
  imports: [CommonModule, DynamicFormModule],
  templateUrl: './filter-articles.component.html',
  styleUrls: ['./filter-articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterArticlesComponent implements OnInit, OnDestroy{
  @ViewChild('dynamicForm', { static: true }) dynamicForm!: IDynamicForm
	@Output() filtered = new EventEmitter<string>()

  structure$ = this.store.select(ngrxFormsQuery.selectStructure)
  data$ = this.store.select(ngrxFormsQuery.selectData)

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(formsActions.setStructure({ structure }))
  }

  ngOnDestroy() {
    this.store.dispatch(formsActions.resetForm())
  }

  updateForm(state: FormState) {
		this.filtered.emit(state.data.filterBy);
  }
}
