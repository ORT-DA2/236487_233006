import {bootstrapApplication} from '@angular/platform-browser'
import {APP_INITIALIZER, EnvironmentProviders, importProvidersFrom, isDevMode, LOCALE_ID} from '@angular/core'
import {provideHttpClient, withInterceptors} from '@angular/common/http'
import {provideStoreDevtools} from '@ngrx/store-devtools'
import {provideRouter, withInMemoryScrolling, withRouterConfig} from '@angular/router'
import {AppComponent} from '@app/app.component'
import {provideAnimations} from '@angular/platform-browser/animations'
import {provideState, provideStore} from '@ngrx/store'
import appRoutes from '@app/app.routes'
import {appConfig, AppConfigService, ErrorHandlerEffects, errorHandlerFeature, errorHandlingInterceptor} from '@core'
import {provideEffects} from '@ngrx/effects'
// Auth
import {authFeature} from '@auth/+data-access/store/auth.reducer'
import {tokenInterceptor} from '@auth/+data-access/services/token-interceptor.service'
import {AuthEffects} from '@auth/+data-access/store/auth.effects'
import {ToastrModule} from 'ngx-toastr'
import {ngrxFormsFeature} from "@ui-components";
import {offensiveWordsFeature} from "@users/+data-access/store/offensive-words/offensive-words.reducers";
import {OffensiveWordsEffects} from "@users/+data-access/store/offensive-words/offensive-words.effects";

export const AppRouteProviders: EnvironmentProviders[] = [
  provideRouter(
    appRoutes,
    withInMemoryScrolling({
      scrollPositionRestoration: 'enabled', // Sets correct back and forward scrolling navigation
    }),
    withRouterConfig({
      paramsInheritanceStrategy: 'always', // Allows child routes to access father params
      onSameUrlNavigation: 'reload',
    })
  ),
]

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appConfig,
      multi: true,
      deps: [AppConfigService],
    },
    {
      provide: LOCALE_ID,
      useValue: 'en-US',
    },
    AppRouteProviders,
    provideStore({
      auth: authFeature.reducer,
      errorHandler: errorHandlerFeature.reducer,
      ngrxForms: ngrxFormsFeature.reducer,
      offensiveWords : offensiveWordsFeature.reducer
    }),
    provideEffects(AuthEffects, ErrorHandlerEffects, OffensiveWordsEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: true,
      traceLimit: 75,
    }),
    provideAnimations(), // Register BrowserAnimationsModule
    provideHttpClient(), // Register HttpClientModule
    provideHttpClient(withInterceptors([errorHandlingInterceptor, tokenInterceptor])),
    importProvidersFrom(
      ToastrModule.forRoot({
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        countDuplicates: true,
      })
    ),
  ],
}).catch((err) => console.log(err))
