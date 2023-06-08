import {ChangeDetectionStrategy, Component, inject, Input, OnInit} from '@angular/core';
import {
  NavigationCancel, NavigationEnd,
  NavigationError,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router, Scroll,
} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent implements OnInit{
  private router = inject(Router);
  
  @Input('fullScreen') isFullScreen = true;
  @Input() text = 'Cargando...';
  @Input() auto = false;
  
  // Detects whenever a routing transition is happening
  @Input() detectRoutingOnGoing = false;
  
  show$ = new BehaviorSubject<boolean>(true)
  
  ngOnInit() {
    if(this.detectRoutingOnGoing){
      this.router.events.subscribe(event =>{
        //console.log("Event type:", event.constructor.name);
        if (
          event instanceof  NavigationStart ||
          event instanceof RouteConfigLoadStart
        ){
          this.show$.next(true)
        }
        else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationError ||
          event instanceof NavigationCancel ||
          event instanceof RouteConfigLoadEnd
        ){
          this.show$.next(false)
        }
      })
    }
  }
  
}
