import { OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import * as i0 from "@angular/core";
export interface CustomFileUpload {
    data: string;
    name: string;
    type: string;
    category: string;
}
export declare class FileUploadFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {
    accept: string;
    placeholder: string;
    onFileDrop(event: DragEvent): void;
    onFileInput(event: Event): void;
    addFile(file: File | null | undefined): Promise<void>;
    parseToUploadFile(file: File): Promise<CustomFileUpload>;
    onDragOver(event: DragEvent): void;
    formControl: FormControl<CustomFileUpload[]>;
    onChange: (value: CustomFileUpload[]) => void;
    onTouched: () => void;
    private _componentDestroyed$;
    ngOnInit(): void;
    ngOnDestroy(): void;
    removeFile(file: CustomFileUpload): void;
    writeValue(files: CustomFileUpload[]): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FileUploadFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FileUploadFieldComponent, "custom-file-upload", never, { "accept": "accept"; "placeholder": "placeholder"; }, {}, never, never, false, never>;
}
