// Modules
import { NgModule } from '@angular/core';
// Component
import { FileUploadFieldComponent } from './file-upload-field.component';
// PrimeNG
import { FileUploadModule } from 'primeng/fileupload';
import { AsyncPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from 'primeng/dragdrop';
import { GalleriaModule } from "primeng/galleria";
import * as i0 from "@angular/core";
export class FileUploadFieldModule {
}
FileUploadFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FileUploadFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FileUploadFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: FileUploadFieldModule, declarations: [FileUploadFieldComponent], imports: [FileUploadModule,
        NgForOf,
        ReactiveFormsModule,
        NgIf,
        NgSwitch,
        NgSwitchCase,
        AsyncPipe,
        DragDropModule,
        NgSwitchDefault,
        GalleriaModule], exports: [FileUploadFieldComponent] });
FileUploadFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FileUploadFieldModule, imports: [FileUploadModule,
        ReactiveFormsModule,
        DragDropModule,
        GalleriaModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FileUploadFieldModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQtZmllbGQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdWktY29tcG9uZW50cy9zcmMvbGliL21vZHVsZXMvZmllbGRzL2ZpbGUtdXBsb2FkLWZpZWxkL2ZpbGUtdXBsb2FkLWZpZWxkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVO0FBQ1YsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxZQUFZO0FBQ1osT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDdkUsVUFBVTtBQUNWLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2xHLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7O0FBa0JoRCxNQUFNLE9BQU8scUJBQXFCOztrSEFBckIscUJBQXFCO21IQUFyQixxQkFBcUIsaUJBSGpCLHdCQUF3QixhQVh2QyxnQkFBZ0I7UUFDaEIsT0FBTztRQUNQLG1CQUFtQjtRQUNuQixJQUFJO1FBQ0osUUFBUTtRQUNSLFlBQVk7UUFDWixTQUFTO1FBQ1QsY0FBYztRQUNkLGVBQWU7UUFDZixjQUFjLGFBR0osd0JBQXdCO21IQUV2QixxQkFBcUIsWUFkaEMsZ0JBQWdCO1FBRWhCLG1CQUFtQjtRQUtuQixjQUFjO1FBRWQsY0FBYzsyRkFLSCxxQkFBcUI7a0JBaEJqQyxRQUFRO21CQUFDO29CQUNULE9BQU8sRUFBRTt3QkFDUixnQkFBZ0I7d0JBQ2hCLE9BQU87d0JBQ1AsbUJBQW1CO3dCQUNuQixJQUFJO3dCQUNKLFFBQVE7d0JBQ1IsWUFBWTt3QkFDWixTQUFTO3dCQUNULGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixjQUFjO3FCQUNkO29CQUNBLFlBQVksRUFBRSxDQUFDLHdCQUF3QixDQUFDO29CQUN4QyxPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztpQkFDcEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBNb2R1bGVzXHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8vIENvbXBvbmVudFxyXG5pbXBvcnQge0ZpbGVVcGxvYWRGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9maWxlLXVwbG9hZC1maWVsZC5jb21wb25lbnQnO1xyXG4vLyBQcmltZU5HXHJcbmltcG9ydCB7RmlsZVVwbG9hZE1vZHVsZX0gZnJvbSAncHJpbWVuZy9maWxldXBsb2FkJztcclxuaW1wb3J0IHtBc3luY1BpcGUsIE5nRm9yT2YsIE5nSWYsIE5nU3dpdGNoLCBOZ1N3aXRjaENhc2UsIE5nU3dpdGNoRGVmYXVsdH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7RHJhZ0Ryb3BNb2R1bGV9IGZyb20gJ3ByaW1lbmcvZHJhZ2Ryb3AnO1xyXG5pbXBvcnQge0dhbGxlcmlhTW9kdWxlfSBmcm9tIFwicHJpbWVuZy9nYWxsZXJpYVwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuXHRpbXBvcnRzOiBbXHJcblx0XHRGaWxlVXBsb2FkTW9kdWxlLFxyXG5cdFx0TmdGb3JPZixcclxuXHRcdFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcblx0XHROZ0lmLFxyXG5cdFx0TmdTd2l0Y2gsXHJcblx0XHROZ1N3aXRjaENhc2UsXHJcblx0XHRBc3luY1BpcGUsXHJcblx0XHREcmFnRHJvcE1vZHVsZSxcclxuXHRcdE5nU3dpdGNoRGVmYXVsdCxcclxuXHRcdEdhbGxlcmlhTW9kdWxlLFxyXG5cdF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbRmlsZVVwbG9hZEZpZWxkQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbRmlsZVVwbG9hZEZpZWxkQ29tcG9uZW50XSxcclxufSlcclxuZXhwb3J0IGNsYXNzIEZpbGVVcGxvYWRGaWVsZE1vZHVsZSB7fVxyXG4iXX0=