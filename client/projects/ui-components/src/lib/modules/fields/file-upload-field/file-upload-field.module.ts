// Modules
import { NgModule } from '@angular/core';
// Component
import {FileUploadFieldComponent} from './file-upload-field.component';
// PrimeNG
import {FileUploadModule} from 'primeng/fileupload';
import {AsyncPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from 'primeng/dragdrop';
import {GalleriaModule} from "primeng/galleria";

@NgModule({
	imports: [
		FileUploadModule,
		NgForOf,
		ReactiveFormsModule,
		NgIf,
		NgSwitch,
		NgSwitchCase,
		AsyncPipe,
		DragDropModule,
		NgSwitchDefault,
		GalleriaModule,
	],
  declarations: [FileUploadFieldComponent],
  exports: [FileUploadFieldComponent],
})
export class FileUploadFieldModule {}
