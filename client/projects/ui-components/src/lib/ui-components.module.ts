// Modules
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TextFieldModule } from './modules/fields/text-field';
import { CheckboxFieldModule } from './modules/fields/checkbox-field';
import { DateFieldModule } from './modules/fields/date-field';
import { SelectFieldModule } from './modules/fields/select-field';
import { NumberFieldModule } from './modules/fields/number-field';
import {TextAreaFieldModule} from './modules/fields/text-area-field';
import {FileUploadFieldModule} from './modules/fields/file-upload-field';
import {LoadingModule} from "./modules/data/loading";

const customModules = [
  TextFieldModule,
  NumberFieldModule,
  CheckboxFieldModule,
  DateFieldModule,
  SelectFieldModule,
  TextAreaFieldModule,
  FileUploadFieldModule,
  LoadingModule
];
const modules = [ButtonModule];

@NgModule({
  imports: [...customModules, ...modules],
  exports: [...customModules, ...modules],
})
export class UiComponentsModule {}
