// Modules
import { NgModule } from '@angular/core';
// Prime
import { InputNumberModule } from 'primeng/inputnumber';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ButtonModule } from 'primeng/button';
import { TextAreaFieldModule } from '../text-area-field';
import { NumberFieldModule } from '../number-field';
import { CheckboxFieldModule } from '../checkbox-field';
import { DateFieldModule } from '../date-field';
import { SelectFieldModule } from '../select-field';
import { TextFieldModule } from '../text-field';
import { FileUploadFieldModule } from '../file-upload-field';
import { FieldsModule } from '../fields.module';
import * as i0 from "@angular/core";
// Component
export class DynamicFormModule {
}
DynamicFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DynamicFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DynamicFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: DynamicFormModule, declarations: [DynamicFormComponent], imports: [FieldsModule,
        InputNumberModule,
        NumberFieldModule,
        CheckboxFieldModule,
        SelectFieldModule,
        DateFieldModule,
        TextFieldModule,
        ButtonModule,
        TextAreaFieldModule,
        FileUploadFieldModule], exports: [DynamicFormComponent] });
DynamicFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DynamicFormModule, imports: [FieldsModule,
        InputNumberModule,
        NumberFieldModule,
        CheckboxFieldModule,
        SelectFieldModule,
        DateFieldModule,
        TextFieldModule,
        ButtonModule,
        TextAreaFieldModule,
        FileUploadFieldModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DynamicFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FieldsModule,
                        InputNumberModule,
                        NumberFieldModule,
                        CheckboxFieldModule,
                        SelectFieldModule,
                        DateFieldModule,
                        TextFieldModule,
                        ButtonModule,
                        TextAreaFieldModule,
                        FileUploadFieldModule,
                    ],
                    declarations: [DynamicFormComponent],
                    exports: [DynamicFormComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3VpLWNvbXBvbmVudHMvc3JjL2xpYi9tb2R1bGVzL2ZpZWxkcy9mb3JtL2R5bmFtaWMtZm9ybS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTtBQUNWLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDeEMsUUFBUTtBQUNSLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFBO0FBQ3ZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFBO0FBRTVFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUM3QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUN4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUNuRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQTtBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDL0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFBOztBQUUvQyxZQUFZO0FBa0JaLE1BQU0sT0FBTyxpQkFBaUI7OzhHQUFqQixpQkFBaUI7K0dBQWpCLGlCQUFpQixpQkFIYixvQkFBb0IsYUFYakMsWUFBWTtRQUNaLGlCQUFpQjtRQUNqQixpQkFBaUI7UUFDakIsbUJBQW1CO1FBQ25CLGlCQUFpQjtRQUNqQixlQUFlO1FBQ2YsZUFBZTtRQUNmLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIscUJBQXFCLGFBR2Isb0JBQW9COytHQUVuQixpQkFBaUIsWUFkMUIsWUFBWTtRQUNaLGlCQUFpQjtRQUNqQixpQkFBaUI7UUFDakIsbUJBQW1CO1FBQ25CLGlCQUFpQjtRQUNqQixlQUFlO1FBQ2YsZUFBZTtRQUNmLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIscUJBQXFCOzJGQUtaLGlCQUFpQjtrQkFoQjdCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osaUJBQWlCO3dCQUNqQixpQkFBaUI7d0JBQ2pCLG1CQUFtQjt3QkFDbkIsaUJBQWlCO3dCQUNqQixlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsWUFBWTt3QkFDWixtQkFBbUI7d0JBQ25CLHFCQUFxQjtxQkFDdEI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsb0JBQW9CLENBQUM7b0JBQ3BDLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixDQUFDO2lCQUNoQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIE1vZHVsZXNcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG4vLyBQcmltZVxyXG5pbXBvcnQgeyBJbnB1dE51bWJlck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvaW5wdXRudW1iZXInXHJcbmltcG9ydCB7IER5bmFtaWNGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9keW5hbWljLWZvcm0vZHluYW1pYy1mb3JtLmNvbXBvbmVudCdcclxuXHJcbmltcG9ydCB7IEJ1dHRvbk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYnV0dG9uJ1xyXG5pbXBvcnQgeyBUZXh0QXJlYUZpZWxkTW9kdWxlIH0gZnJvbSAnLi4vdGV4dC1hcmVhLWZpZWxkJ1xyXG5pbXBvcnQgeyBOdW1iZXJGaWVsZE1vZHVsZSB9IGZyb20gJy4uL251bWJlci1maWVsZCdcclxuaW1wb3J0IHsgQ2hlY2tib3hGaWVsZE1vZHVsZSB9IGZyb20gJy4uL2NoZWNrYm94LWZpZWxkJ1xyXG5pbXBvcnQgeyBEYXRlRmllbGRNb2R1bGUgfSBmcm9tICcuLi9kYXRlLWZpZWxkJ1xyXG5pbXBvcnQgeyBTZWxlY3RGaWVsZE1vZHVsZSB9IGZyb20gJy4uL3NlbGVjdC1maWVsZCdcclxuaW1wb3J0IHsgVGV4dEZpZWxkTW9kdWxlIH0gZnJvbSAnLi4vdGV4dC1maWVsZCdcclxuaW1wb3J0IHsgRmlsZVVwbG9hZEZpZWxkTW9kdWxlIH0gZnJvbSAnLi4vZmlsZS11cGxvYWQtZmllbGQnXHJcbmltcG9ydCB7IEZpZWxkc01vZHVsZSB9IGZyb20gJy4uL2ZpZWxkcy5tb2R1bGUnXHJcblxyXG4vLyBDb21wb25lbnRcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgRmllbGRzTW9kdWxlLFxyXG4gICAgSW5wdXROdW1iZXJNb2R1bGUsXHJcbiAgICBOdW1iZXJGaWVsZE1vZHVsZSxcclxuICAgIENoZWNrYm94RmllbGRNb2R1bGUsXHJcbiAgICBTZWxlY3RGaWVsZE1vZHVsZSxcclxuICAgIERhdGVGaWVsZE1vZHVsZSxcclxuICAgIFRleHRGaWVsZE1vZHVsZSxcclxuICAgIEJ1dHRvbk1vZHVsZSxcclxuICAgIFRleHRBcmVhRmllbGRNb2R1bGUsXHJcbiAgICBGaWxlVXBsb2FkRmllbGRNb2R1bGUsXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtEeW5hbWljRm9ybUNvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW0R5bmFtaWNGb3JtQ29tcG9uZW50XSxcclxufSlcclxuZXhwb3J0IGNsYXNzIER5bmFtaWNGb3JtTW9kdWxlIHt9XHJcbiJdfQ==