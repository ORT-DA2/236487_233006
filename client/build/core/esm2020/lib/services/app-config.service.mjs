import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class AppConfigService {
    constructor(_handler) {
        this._handler = _handler;
    }
    get dotEnv() {
        return this._dotEnv;
    }
    // Método para cargar el archivo de configuración
    loadConfig() {
        const http = new HttpClient(this._handler);
        return http
            .get('/assets/.env')
            .toPromise()
            .then((response) => {
            if (response)
                this._dotEnv = response;
        });
    }
}
AppConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AppConfigService, deps: [{ token: i1.HttpBackend }], target: i0.ɵɵFactoryTarget.Injectable });
AppConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AppConfigService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AppConfigService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpBackend }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvbGliL3NlcnZpY2VzL2FwcC1jb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBZSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBUy9ELE1BQU0sT0FBTyxnQkFBZ0I7SUFHM0IsWUFBb0IsUUFBcUI7UUFBckIsYUFBUSxHQUFSLFFBQVEsQ0FBYTtJQUFHLENBQUM7SUFFN0MsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxpREFBaUQ7SUFDMUMsVUFBVTtRQUNmLE1BQU0sSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzQyxPQUFPLElBQUk7YUFDUixHQUFHLENBQWEsY0FBYyxDQUFDO2FBQy9CLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ2pCLElBQUksUUFBUTtnQkFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7OzZHQW5CVSxnQkFBZ0I7aUhBQWhCLGdCQUFnQixjQUZmLE1BQU07MkZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cEJhY2tlbmQsIEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBcHBDb25maWcge1xyXG4gIGFwaTogc3RyaW5nO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwQ29uZmlnU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfZG90RW52ITogSUFwcENvbmZpZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaGFuZGxlcjogSHR0cEJhY2tlbmQpIHt9XHJcblxyXG4gIGdldCBkb3RFbnYoKSA6IElBcHBDb25maWd7XHJcbiAgICByZXR1cm4gdGhpcy5fZG90RW52O1xyXG4gIH1cclxuXHJcbiAgLy8gTcOpdG9kbyBwYXJhIGNhcmdhciBlbCBhcmNoaXZvIGRlIGNvbmZpZ3VyYWNpw7NuXHJcbiAgcHVibGljIGxvYWRDb25maWcoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBodHRwID0gbmV3IEh0dHBDbGllbnQodGhpcy5faGFuZGxlcik7XHJcblxyXG4gICAgcmV0dXJuIGh0dHBcclxuICAgICAgLmdldDxJQXBwQ29uZmlnPignL2Fzc2V0cy8uZW52JylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZSkgdGhpcy5fZG90RW52ID0gcmVzcG9uc2U7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=