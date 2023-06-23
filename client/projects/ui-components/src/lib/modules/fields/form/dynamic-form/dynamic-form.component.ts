import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DEFAULT_ERROR_TYPES, defaultFieldValues, Field, FieldType, FormState, IDynamicForm} from '../shared';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  Subject,
  tap,
} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FormService} from "../store/form.service";
import {Store} from "@ngrx/store";
import {ngrxFormsQuery, OptionsState} from "../store";
import {IOption} from "../../select-field/select-field.component";

export enum FormStatus{
  INVALID = 'INVALID',
  VALID = 'VALID',
  PENDING = 'PENDING'
}


// DynamicFormComponent is an Angular component that creates a form based on a given structure and manages its state.
@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements IDynamicForm, OnInit, OnDestroy, ControlValueAccessor {
  @Input() structure$!: Observable<Field[]>;
  @Input() data$!: Observable<any>;
  @Input('readonly') formReadOnly = false;

  @Output() updateForm = new EventEmitter<FormState>();

  fieldType = FieldType;
  defaultErrors = DEFAULT_ERROR_TYPES;
  
  form!: FormGroup;
  formSubmitted$ = new BehaviorSubject<boolean>(false);
  formDestroyed$ = new Subject<void>();

  @Output() formInitialized = new EventEmitter<FormGroup>();
  
  options$ = this.store.select(ngrxFormsQuery.selectOptions)

  constructor(
    private readonly fb: FormBuilder,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly formService : FormService,
    private readonly store : Store
  ) {}

  ngOnInit() {
    this.watchForFormBuild();
  
    this.formService.resetForm$.pipe(takeUntil(this.formDestroyed$)).subscribe(() => {
      this.form?.reset();
    });
  
    this.formService.formSubmitted$.pipe(takeUntil(this.formDestroyed$)).subscribe(() => {
      this.submitted()
    });
  }

  submitted() {
    this.form.markAsTouched();
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    this.formSubmitted$.next(true);

    this.changeDetector.detectChanges();
  }
  
  hasValidator(control : string) : boolean{
    return this.form.controls[control].hasValidator(Validators.required) || this.form.controls[control].hasValidator(Validators.requiredTrue)
  }
  
  getOptionsForKey(optionsArray: OptionsState[], key: string): IOption[] {
    const foundOption = optionsArray.find(option => option.key === key);
    return foundOption ? foundOption.data : [];
  }
  
  // Subscribes to structure$ and then to data$ observables to build and patch the form.
  // They are also responsible for handling form patching and resetting based on structure and data.
  private watchForFormBuild(){
    this.structure$
      .pipe(
        map(this.formBuilder),
        tap(this.initializeForm),
        (f$) => combineLatest([f$, this.data$]),
        takeUntil(this.formDestroyed$)
      )
      .subscribe(this.patchValue);
    
  }
  
  // Initializes the form group property and sets up listeners for form changes.
  // Context is shared by JS, thats why I have access to FormGroup instance.
  private initializeForm = (form: FormGroup) => {
    this.form = form;
    this.listenFormChanges(form);
    this.listenFormStatusChanges(form);
    this.formInitialized.emit(this.form);
  };


  // Builds a FormGroup based on the provided structure and adds FormControl instances for each field.
  private formBuilder = (structure: Field[]): FormGroup => {
    const formGroupConfig = structure.find(field => field.name === null);
    const groupValidators = formGroupConfig?.validators || [];
    const groupAsyncValidators = formGroupConfig?.asyncValidators || [];
    const groupUpdateOn = formGroupConfig?.updateOn


    // Remove the FormGroup config from the structure array.
    if (formGroupConfig) structure = structure.filter(field => field.name !== null);


    const group = this.fb.group(
      {},
      {
        validators: groupValidators,
        asyncValidators: groupAsyncValidators,
        updateOn : groupUpdateOn
      }
    );

    structure.forEach((field) =>
      group.addControl(field.name!, this.control(field))
    );


    return group;
  };

  // Creates a FormControl for the given field with its initial value, validators, and other configurations.
  private control = (field: Field): FormControl => {
    const value = field.type ? defaultFieldValues[field.type.toUpperCase() as keyof typeof FieldType] : null;
    
    return this.fb.control({ value, disabled: field.disabled || false }, {
      validators: field.validators,
      asyncValidators: field.asyncValidators,
      updateOn: field.updateOn
    });
  };

  // Patches the form with the given data or an empty object if data is not provided.
  private patchValue = ([form, data]: [FormGroup, any]) => {
    // Only patch values if the data object is different from the current form values
    if (!this.isEqual(data, form.value)) {
      form.patchValue(data || {}, { emitEvent: false });
    }
  };

  // Listens for form value changes and emits the updateForm event with the changes.
  private listenFormChanges(form: FormGroup) {
    form.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged((prev, curr) => this.isEqual(prev, curr)),
        takeUntil(this.formDestroyed$)
      )
      .subscribe((changes) => {
        this.updateForm.emit({
          data : changes,
          valid : this.form.valid,
          status : this.form.status
        });
      });
  }

  private listenFormStatusChanges(form: FormGroup) {
    let prevStatus = 'INVALID'
    form.statusChanges.pipe(takeUntil(this.formDestroyed$))
      .subscribe((status => {
        if(prevStatus === 'PENDING'){
          this.updateForm.emit({
            data : this.form.value,
            valid : this.form.valid,
            status
          });
        }
        prevStatus = status;

      }))
  }

  // Deep equality check for two objects.
  // FIXME: Should I add extenal library to improve performance ?
  private isEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;

    if (
      typeof obj1 !== 'object' ||
      typeof obj2 !== 'object' ||
      obj1 === null ||
      obj2 === null
    )
      return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!keys2.includes(key)) return false;
      if (!this.isEqual(obj1[key], obj2[key])) return false;
    }

    return true;
  }
  

  ngOnDestroy() {
    this.formDestroyed$.next();
    this.formDestroyed$.complete();
  }

  // ------------------------------ Implementation of  ControlValueAccessor methods ------------------------------
  writeValue(value: any): void {
    this.form.patchValue(value, { emitEvent: false });
  }
  
  registerOnChange(fn: (value: any) => void): void {
    this.form.valueChanges.pipe(
      filter(() => this.form.touched),
      distinctUntilChanged()).subscribe(fn);
  }

  registerOnTouched(fn: () => void): void {
    this.form.valueChanges.pipe(filter(() => this.form.touched), distinctUntilChanged()).subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }
  
}
