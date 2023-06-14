import { HttpBackend } from '@angular/common/http';
import * as i0 from "@angular/core";
export interface IAppConfig {
    api: string;
}
export declare class AppConfigService {
    private _handler;
    private _dotEnv;
    constructor(_handler: HttpBackend);
    get dotEnv(): IAppConfig;
    loadConfig(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AppConfigService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AppConfigService>;
}
