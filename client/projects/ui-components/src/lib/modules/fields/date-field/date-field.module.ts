// Modules
import { NgModule } from '@angular/core';
// Prime
import { CalendarModule } from 'primeng/calendar';
// Component
import { DateFieldComponent } from './date-field.component';
import {FieldsModule} from "../fields.module";

@NgModule({
  declarations: [DateFieldComponent],
  imports: [FieldsModule, CalendarModule],
  exports: [DateFieldComponent],
})
export class DateFieldModule {}
