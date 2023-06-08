import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate} from "@angular/router";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {ArticleVisibilityGuard} from "@articles/utils/guards/article-visibility.guard";
import {LoadArticleGuard} from "@articles/load-article.guard";

/*
En este código, ArticleMasterGuard se encarga de coordinar la ejecución de ArticleGuardService y ArticleVisibilityGuard.
Utiliza switchMap para suscribirse al observable retornado por ArticleGuardService.canActivate,y cuando este observable emite
un valor, se suscribe al observable retornado por ArticleVisibilityGuard.canActivate. De esta manera,
 ArticleVisibilityGuard.canActivate solo se ejecuta después de que ArticleGuardService.canActivate haya terminado.
*/


/*
  Se ejecuta la guardia ArticleGuardService primero y una vez que esta guardia haya terminado,
  se ejecuta la guardia ArticleVisibilityGuard. Para lograr esto, utilizamos un servicio intermedio
  que maneja la lógica de la secuenciación de las guardias.
  
  Use this approach when you need a specific order in your CanActivate guards.
*/

@Injectable({
	providedIn: 'root',
})
export class ArticleMasterGuard implements CanActivate {
	constructor(
		private articleGuardService: LoadArticleGuard,
		private articleVisibilityGuard: ArticleVisibilityGuard
	) {}
	
	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
		return this.articleGuardService.canActivate(route).pipe(
			switchMap(() => this.articleVisibilityGuard.canActivate())
		);
	}
}
