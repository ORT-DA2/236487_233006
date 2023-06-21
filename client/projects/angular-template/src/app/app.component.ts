import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LocalStorageService} from "@auth/+data-access/services/local-storage.service";
import {Store} from "@ngrx/store";
import {authActions} from "@auth/+data-access/store/auth.actions";
import {LoadingModule} from "@ui-components";
import {wordsActions} from "@users/+data-access/store/offensive-words/offensive-words.actions";
import {
  AdminNotificationDialogComponent
} from "@shared/components/admin-notification-dialog/admin-notification-dialog.component";

@Component({
  selector: 'app-shell',
  standalone: true,
  // All the dependencies of our componentes are going to be loaded in the imports array
  imports: [RouterOutlet, LoadingModule, AdminNotificationDialogComponent],
  template: `
    <main>
      <router-outlet/>
    </main>
    <loading [detectRoutingOnGoing]="true" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit{
  constructor(
    private localStorageService: LocalStorageService,
    private store: Store
  ) { }
  
  ngOnInit(): void {
    this.localStorageService.getUser().subscribe(user => {
      // On app reload get user from local storage
      if (user) {
        this.store.dispatch(authActions.setLoggedUser({
          data : user
        }));
      }
    });
  }
}

