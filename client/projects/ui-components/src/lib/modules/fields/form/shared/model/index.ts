import {
  AsyncValidatorFn,
  FormControlStatus,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { FieldType } from '../constants';
import { IOption } from '../../../select-field/select-field.component';
import {Observable} from "rxjs";

export interface Field {
  type: FieldType; // type=""
  name: string | null; // formControlName
  label?: string; // Label of the field
  validators?: ValidatorFn[];
  asyncValidators?: AsyncValidatorFn[];
  updateOn?: 'change' | 'blur' | 'submit';
  placeholder?: string;

  attrs?: Attribute;

  disabled?: boolean;
  readonly?: boolean;
  hide?: Function;

  errors?: FieldError[];
  groupErrors?: FieldError[];

  // Special types of Fields
  select?: SelectField;
  number?: NumberField;
  file?: FileField;
}


export interface SelectField{
  options ?: IOption[];
	options$ ?: Observable<IOption[]>
  showClear ?: boolean
}
export interface FileField{
	accept : string
}

export interface Attribute{
	type?: "password" | "text" | "email"
	icon ?: string
	iconPosition ?: "right" | "left"
}

export interface FieldError{
	type : string;
	message : string;
  showOnSubmit ?: boolean
}

export interface NumberField {
  maxFractionDigits?: number
	max?: number
}

export interface FormState {
	data: any,
	valid : boolean,
  status : FormControlStatus
}

export interface IDynamicForm{
	form : FormGroup
	submitted : () => void;
}

