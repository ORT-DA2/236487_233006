import {Route} from '@angular/router';
import {AuthGuard} from '@auth/utils/guards/auth.guard';
import PageNotFoundComponent from "@shared/components/page-not-found/page-not-found.component";

const appRoutes: Route[] = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'login',
	},
	{
		path: 'login',
		loadComponent: () => import('@auth/pages/login-page/login-page.component'),   // Only Public Route
	},
  {
    path: 'private',
    loadChildren: () => import('@layout/private.routes'),
    canActivate : [AuthGuard],	// Protects all our private guards
  },
	{
		path: 'not-found',
		loadComponent: () => import('@shared/components/page-not-found/page-not-found.component'),
	},
	{
		path: 'access-denied',
		loadComponent: () => import('@shared/components/access-denied/access-denied.component'),
	},
	{ path: '**',  component: PageNotFoundComponent},
] as Route[];
export default appRoutes;
