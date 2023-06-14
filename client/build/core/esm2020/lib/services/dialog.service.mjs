import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InitialDialogState } from "@core";
import * as i0 from "@angular/core";
export class DialogService {
    constructor() {
        this.dialogStateTracker$ = new BehaviorSubject(InitialDialogState);
        this.payloadState$ = new BehaviorSubject(null);
        this.dialog$ = this.dialogStateTracker$.asObservable();
        this.payload$ = this.payloadState$.asObservable();
    }
    openDialog(dialogType, payload = null) {
        this.payloadState$.next(payload);
        this.dialogStateTracker$.next({ ...this.dialogStateTracker$.value, [dialogType]: true });
    }
    closeDialog(dialogType) {
        this.payloadState$.next(null);
        this.dialogStateTracker$.next({ ...this.dialogStateTracker$.value, [dialogType]: false });
    }
    get data() {
        return this.payloadState$.value?.data;
    }
    get payload() {
        return this.payloadState$.value;
    }
}
DialogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DialogService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DialogService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DialogService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9saWIvc2VydmljZXMvZGlhbG9nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUMsZUFBZSxFQUFVLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBcUIsa0JBQWtCLEVBQUMsTUFBTSxPQUFPLENBQUM7O0FBTTdELE1BQU0sT0FBTyxhQUFhO0lBSDFCO1FBSVUsd0JBQW1CLEdBQUcsSUFBSSxlQUFlLENBQVMsa0JBQWtCLENBQUMsQ0FBQztRQUN0RSxrQkFBYSxHQUFHLElBQUksZUFBZSxDQUF1QixJQUFJLENBQUMsQ0FBQztRQUV4RSxZQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2xELGFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBbUI5QztJQWpCQyxVQUFVLENBQUMsVUFBc0IsRUFBRSxVQUFnQyxJQUFJO1FBQ3JFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFFRCxXQUFXLENBQUMsVUFBc0I7UUFDaEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ2xDLENBQUM7OzBHQXZCVSxhQUFhOzhHQUFiLGFBQWEsY0FGWixNQUFNOzJGQUVQLGFBQWE7a0JBSHpCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgU3ViamVjdH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7RGlhbG9nLCBEaWFsb2dUeXBlLCBJbml0aWFsRGlhbG9nU3RhdGV9IGZyb20gXCJAY29yZVwiO1xyXG5pbXBvcnQge0RpYWxvZ1BheWxvYWR9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGlhbG9nU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBkaWFsb2dTdGF0ZVRyYWNrZXIkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEaWFsb2c+KEluaXRpYWxEaWFsb2dTdGF0ZSk7XHJcbiAgcHJpdmF0ZSBwYXlsb2FkU3RhdGUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEaWFsb2dQYXlsb2FkIHwgbnVsbD4obnVsbCk7XHJcbiAgXHJcbiAgZGlhbG9nJCA9IHRoaXMuZGlhbG9nU3RhdGVUcmFja2VyJC5hc09ic2VydmFibGUoKTtcclxuICBwYXlsb2FkJCA9IHRoaXMucGF5bG9hZFN0YXRlJC5hc09ic2VydmFibGUoKTtcclxuICBcclxuICBvcGVuRGlhbG9nKGRpYWxvZ1R5cGU6IERpYWxvZ1R5cGUsIHBheWxvYWQ6IERpYWxvZ1BheWxvYWQgfCBudWxsID0gbnVsbCk6IHZvaWQge1xyXG4gICAgdGhpcy5wYXlsb2FkU3RhdGUkLm5leHQocGF5bG9hZCk7XHJcbiAgICB0aGlzLmRpYWxvZ1N0YXRlVHJhY2tlciQubmV4dCh7IC4uLnRoaXMuZGlhbG9nU3RhdGVUcmFja2VyJC52YWx1ZSwgW2RpYWxvZ1R5cGVdOiB0cnVlIH0pO1xyXG4gIH1cclxuICBcclxuICBjbG9zZURpYWxvZyhkaWFsb2dUeXBlOiBEaWFsb2dUeXBlKTogdm9pZCB7XHJcbiAgICB0aGlzLnBheWxvYWRTdGF0ZSQubmV4dChudWxsKTtcclxuICAgIHRoaXMuZGlhbG9nU3RhdGVUcmFja2VyJC5uZXh0KHsgLi4udGhpcy5kaWFsb2dTdGF0ZVRyYWNrZXIkLnZhbHVlLCBbZGlhbG9nVHlwZV06IGZhbHNlIH0pO1xyXG4gIH1cclxuICBcclxuICBnZXQgZGF0YSgpIDogYW55IHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXlsb2FkU3RhdGUkLnZhbHVlPy5kYXRhO1xyXG4gIH1cclxuICBcclxuICBnZXQgcGF5bG9hZCgpIDogRGlhbG9nUGF5bG9hZCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMucGF5bG9hZFN0YXRlJC52YWx1ZTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=