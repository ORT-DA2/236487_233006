// Modules
import { NgModule } from '@angular/core';
// Prime
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
// Component
import { SelectFieldComponent } from './select-field.component';
import { FieldsModule } from "../fields.module";
import * as i0 from "@angular/core";
export class SelectFieldModule {
}
SelectFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SelectFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SelectFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SelectFieldModule, declarations: [SelectFieldComponent], imports: [FieldsModule, MultiSelectModule, DropdownModule], exports: [SelectFieldComponent] });
SelectFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SelectFieldModule, imports: [FieldsModule, MultiSelectModule, DropdownModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SelectFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [SelectFieldComponent],
                    imports: [FieldsModule, MultiSelectModule, DropdownModule],
                    exports: [SelectFieldComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWZpZWxkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3VpLWNvbXBvbmVudHMvc3JjL2xpYi9tb2R1bGVzL2ZpZWxkcy9zZWxlY3QtZmllbGQvc2VsZWN0LWZpZWxkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVO0FBQ1YsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxRQUFRO0FBQ1IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELFlBQVk7QUFDWixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7O0FBTzlDLE1BQU0sT0FBTyxpQkFBaUI7OzhHQUFqQixpQkFBaUI7K0dBQWpCLGlCQUFpQixpQkFKYixvQkFBb0IsYUFDekIsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGNBQWMsYUFDL0Msb0JBQW9COytHQUVuQixpQkFBaUIsWUFIbEIsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGNBQWM7MkZBRzlDLGlCQUFpQjtrQkFMN0IsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDcEMsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGNBQWMsQ0FBQztvQkFDMUQsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7aUJBQ2hDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTW9kdWxlc1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vLyBQcmltZVxyXG5pbXBvcnQgeyBNdWx0aVNlbGVjdE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvbXVsdGlzZWxlY3QnO1xyXG5pbXBvcnQgeyBEcm9wZG93bk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvZHJvcGRvd24nO1xyXG4vLyBDb21wb25lbnRcclxuaW1wb3J0IHsgU2VsZWN0RmllbGRDb21wb25lbnQgfSBmcm9tICcuL3NlbGVjdC1maWVsZC5jb21wb25lbnQnO1xyXG5pbXBvcnQge0ZpZWxkc01vZHVsZX0gZnJvbSBcIi4uL2ZpZWxkcy5tb2R1bGVcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbU2VsZWN0RmllbGRDb21wb25lbnRdLFxyXG4gIGltcG9ydHM6IFtGaWVsZHNNb2R1bGUsIE11bHRpU2VsZWN0TW9kdWxlLCBEcm9wZG93bk1vZHVsZV0sXHJcbiAgZXhwb3J0czogW1NlbGVjdEZpZWxkQ29tcG9uZW50XSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlbGVjdEZpZWxkTW9kdWxlIHt9XHJcbiJdfQ==