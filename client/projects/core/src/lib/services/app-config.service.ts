import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';

export interface IAppConfig {
  api: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private _dotEnv!: IAppConfig;

  constructor(private _handler: HttpBackend) {}

  get dotEnv() : IAppConfig{
    return this._dotEnv;
  }

  // Método para cargar el archivo de configuración
  public loadConfig(): Promise<void> {
    const http = new HttpClient(this._handler);

    return http
      .get<IAppConfig>('/assets/.env')
      .toPromise()
      .then((response) => {
        if (response) this._dotEnv = response;
      });
  }
}
