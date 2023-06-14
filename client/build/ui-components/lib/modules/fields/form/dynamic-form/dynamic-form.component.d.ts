import { ChangeDetectorRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
import { Field, FormState, IDynamicForm } from '../shared';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FormService } from "../state/form-service";
import * as i0 from "@angular/core";
export declare enum FormStatus {
    INVALID = "INVALID",
    VALID = "VALID",
    PENDING = "PENDING"
}
export declare class DynamicFormComponent implements IDynamicForm, OnInit, OnDestroy, ControlValueAccessor {
    private readonly fb;
    private changeDetector;
    private formService;
    structure$: Observable<Field[]>;
    data$: Observable<any>;
    formReadOnly: boolean;
    updateForm: EventEmitter<FormState>;
    fieldType: {
        readonly TEXT: "text";
        readonly NUMBER: "number";
        readonly DATE: "date";
        readonly SELECT: "select";
        readonly MULTI_SELECT: "multi_select";
        readonly CHECK: "check";
        readonly TEXTAREA: "textarea";
        readonly FILE_UPLOAD: "file_upload";
        readonly FORM_GROUP: "form";
        readonly INVISIBLE: null;
    };
    defaultErrors: {
        type: string;
        message: string;
        showOnSubmit: boolean;
    }[];
    form: FormGroup;
    formSubmitted$: BehaviorSubject<boolean>;
    formDestroyed$: Subject<void>;
    formInitialized: EventEmitter<FormGroup<any>>;
    constructor(fb: FormBuilder, changeDetector: ChangeDetectorRef, formService: FormService);
    ngOnInit(): void;
    submitted(): void;
    hasValidator(control: string): boolean;
    private watchForFormBuild;
    private initializeForm;
    private formBuilder;
    private control;
    private patchValue;
    private listenFormChanges;
    private listenFormStatusChanges;
    private isEqual;
    ngOnDestroy(): void;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DynamicFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DynamicFormComponent, "dynamic-form", never, { "structure$": "structure$"; "data$": "data$"; "formReadOnly": "readonly"; }, { "updateForm": "updateForm"; "formInitialized": "formInitialized"; }, never, never, false, never>;
}
