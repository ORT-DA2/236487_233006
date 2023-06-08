// Modules
import { NgModule } from '@angular/core';
// Prime
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
// Component
import { SelectFieldComponent } from './select-field.component';
import {FieldsModule} from "../fields.module";

@NgModule({
  declarations: [SelectFieldComponent],
  imports: [FieldsModule, MultiSelectModule, DropdownModule],
  exports: [SelectFieldComponent],
})
export class SelectFieldModule {}
