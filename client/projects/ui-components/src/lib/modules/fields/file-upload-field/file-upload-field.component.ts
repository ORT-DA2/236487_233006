import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface CustomFileUpload {
  data: string /* Base64 */;
  name: string;
  type: string /*   png   */;
  category: string /*  image  */;
}


@Component({
  selector: 'custom-file-upload',
  templateUrl: './file-upload-field.component.html',
  styles: [`
    .drop-zone {
      width: 100%;
      height: 150px;
      border: 2px dashed #ccc;
      text-align: center;
      padding: 20px;
      cursor: pointer;
      border-radius: 6px;
    }

    .preview-container{
      display : flex;
      flex-direction: column;
    }
    .preview{
      display: flex;
      align-items: center;
      width: 100%;
      column-gap: 20px;
      margin-bottom: 10px;
      padding: 12px 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .preview:last-child {
      margin-bottom: 19px;
    }
    
    .preview p{
      margin-bottom: 10px;
      text-align: center;
      color: #333;
      font-size: 16px;
    }
    .preview img{
      width: 80px;
      height: 60px;
    }
    
    .preview-container .button{
      margin-left: auto;
    }
    
    .file-input{
      display: none !important;
    }
    
    .p-placeholder{
      color: #b3b3b3;
    }


  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadFieldComponent,
      multi: true
    }
  ]
})
export class FileUploadFieldComponent implements  OnInit, OnDestroy, ControlValueAccessor {
  
  @Input() accept  = "image/*, audio/*, video/*"
  @Input() placeholder !: string;
  
  onFileDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files.item(0);
    this.addFile(file)
  }
  
  onFileInput(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.item(0);
    this.addFile(file)
  }
  
  async addFile(file : File | null | undefined){
    if (file){
      try {
        const uploadFile = await this.parseToUploadFile(file);
        const files : CustomFileUpload[] = this.formControl.value ? [...this.formControl.value , uploadFile] : [uploadFile];
        this.formControl.setValue(files);
      } catch (error) {
        console.error('Error converting file to upload format', error);
      }
    }
  }
  
  parseToUploadFile(file: File): Promise<CustomFileUpload> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onloadend = function() {
        if (reader.result) {
          resolve({
            data: reader.result.toString(),  // full base64 string
            name: file.name,
            type: file.type.split('/')[1],   // split and get 'png' from 'image/png'
            category: file.type.split('/')[0]   // split and get 'image' from 'image/png'
          });
        } else {
          reject(new Error('Error reading file'));
        }
      }
      
      reader.onerror = function() {
        reject(new Error('Error reading file'));
      }
      
      reader.readAsDataURL(file);
    });
  }
  
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
  
  public formControl = new FormControl<CustomFileUpload[]>([], {
    nonNullable : true
  });
  
  public onChange = (value: CustomFileUpload[]) => {};
  public onTouched = () => {};
  private _componentDestroyed$ = new Subject<void>();
  
  
  ngOnInit() {
    this.formControl.valueChanges
      .pipe(takeUntil(this._componentDestroyed$))
      .subscribe((value) => this.onChange(value)
      );
  }
  
  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
  }
  
  
  
  removeFile(file : CustomFileUpload){
     const currentFiles = this.formControl.value;
     const updatedFiles = currentFiles.filter((f) => f !== file);
     this.formControl.setValue(updatedFiles)
  }
  
  
  
  // El problema es que cuando hago new value : File[]
  // pero cuando edito es de tipo : string[] (base 64)
  writeValue( files : CustomFileUpload[]) {
    this.formControl.setValue(files)
  }
  
  registerOnChange( fn: any ) {
    this.onChange = fn;
  }
  
  registerOnTouched( fn: any ) {
    this.onTouched = fn;
  }

}
