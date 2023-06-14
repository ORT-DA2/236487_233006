import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./app-config.service";
export class ApiService {
    constructor(http, appConfigService) {
        this.http = http;
        this.appConfigService = appConfigService;
    }
    get(url, params = new HttpParams()) {
        return this.http.get(`${this.api}${url}`, {
            headers: this.headers,
            params,
        });
    }
    post(url, data) {
        return this.http.post(`${this.api}${url}`, JSON.stringify(data), {
            headers: this.headers,
        });
    }
    put(url, data) {
        return this.http.put(`${this.api}${url}`, JSON.stringify(data), {
            headers: this.headers,
        });
    }
    delete(url) {
        return this.http.delete(`${this.api}${url}`, {
            headers: this.headers,
        });
    }
    get headers() {
        const headersConfig = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };
        return new HttpHeaders(headersConfig);
    }
    get api() {
        return this.appConfigService.dotEnv.api;
    }
}
ApiService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ApiService, deps: [{ token: i1.HttpClient }, { token: i2.AppConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
ApiService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ApiService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ApiService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.AppConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9saWIvc2VydmljZXMvYXBpLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBSzNFLE1BQU0sT0FBTyxVQUFVO0lBQ3JCLFlBQ1UsSUFBZ0IsRUFDaEIsZ0JBQWtDO1FBRGxDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUN6QyxDQUFDO0lBRUosR0FBRyxDQUFJLEdBQVcsRUFBRSxTQUFxQixJQUFJLFVBQVUsRUFBRTtRQUN2RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsRUFBRTtZQUMzQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsTUFBTTtTQUNQLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJLENBQU8sR0FBVyxFQUFFLElBQVE7UUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNsRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELEdBQUcsQ0FBTyxHQUFXLEVBQUUsSUFBTztRQUM1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFJLEdBQVc7UUFDbkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLEVBQUU7WUFDOUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ3RCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxNQUFNLGFBQWEsR0FBRztZQUNwQixjQUFjLEVBQUUsa0JBQWtCO1lBQ2xDLE1BQU0sRUFBRSxrQkFBa0I7U0FDM0IsQ0FBQztRQUVGLE9BQU8sSUFBSSxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDMUMsQ0FBQzs7dUdBMUNVLFVBQVU7MkdBQVYsVUFBVSxjQURHLE1BQU07MkZBQ25CLFVBQVU7a0JBRHRCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBBcHBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9hcHAtY29uZmlnLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcclxuZXhwb3J0IGNsYXNzIEFwaVNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHJpdmF0ZSBhcHBDb25maWdTZXJ2aWNlOiBBcHBDb25maWdTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBnZXQ8VD4odXJsOiBzdHJpbmcsIHBhcmFtczogSHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCkpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFQ+KGAke3RoaXMuYXBpfSR7dXJsfWAsIHtcclxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxyXG4gICAgICBwYXJhbXMsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHBvc3Q8VCwgRD4odXJsOiBzdHJpbmcsIGRhdGE/OiBEKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8VD4oYCR7dGhpcy5hcGl9JHt1cmx9YCwgSlNPTi5zdHJpbmdpZnkoZGF0YSksIHtcclxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdXQ8VCwgRD4odXJsOiBzdHJpbmcsIGRhdGE6IEQpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucHV0PFQ+KGAke3RoaXMuYXBpfSR7dXJsfWAsIEpTT04uc3RyaW5naWZ5KGRhdGEpLCB7XHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlPFQ+KHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZTxUPihgJHt0aGlzLmFwaX0ke3VybH1gLCB7XHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGhlYWRlcnMoKTogSHR0cEhlYWRlcnMge1xyXG4gICAgY29uc3QgaGVhZGVyc0NvbmZpZyA9IHtcclxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgSHR0cEhlYWRlcnMoaGVhZGVyc0NvbmZpZyk7XHJcbiAgfVxyXG5cclxuICBnZXQgYXBpKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXBwQ29uZmlnU2VydmljZS5kb3RFbnYuYXBpO1xyXG4gIH1cclxufVxyXG4iXX0=