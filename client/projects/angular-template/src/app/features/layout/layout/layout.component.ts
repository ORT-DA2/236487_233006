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
import {Store} from "@ngrx/store";
import {wordsActions} from "@users/+data-access/store/offensive-words/offensive-words.actions";

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
export class LayoutComponent {}
