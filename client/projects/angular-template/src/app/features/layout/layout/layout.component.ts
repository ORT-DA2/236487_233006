import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {RippleModule} from 'primeng/ripple';
import {BadgeModule} from 'primeng/badge';
import {InputTextModule} from 'primeng/inputtext';
import {StyleClassModule} from 'primeng/styleclass';
import {NavbarComponent} from "@layout/components/navbar/navbar.component";
import {RequiredRolesDirective} from "@auth/utils/dierctives/required-roles.directive";
import {LoadingModule} from "@ui-components";
import {
	AdminNotificationDialogComponent,
} from "@shared/components/admin-notification-dialog/admin-notification-dialog.component";
import {DialogService, DialogType} from "@core";
import {ArticleService} from "@articles/+data-access/services/article.service";
import {DialogModule} from "primeng/dialog";

@Component({
  selector: 'layout',
  standalone: true,
	imports: [
		CommonModule,
		RouterOutlet,
		RippleModule,
		BadgeModule,
		InputTextModule,
		StyleClassModule,
		RouterLink,
		RequiredRolesDirective,
		NavbarComponent,
		LoadingModule,
		AdminNotificationDialogComponent,
		DialogModule,
	],
  templateUrl: './layout.component.html',
	styles:[`
    navbar{
			background: white;
      position: sticky;
      top: 0;
      width: 100%;
			z-index: 1;
      transition: height 0.3s;
			border-bottom: 1px solid #4957b6;
    }
	`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit{
	
	dialog$ = this.dialogService.dialog$
	constructor(private dialogService : DialogService, private articleService : ArticleService) {}
	
	ngOnInit() {
	
	}
}
