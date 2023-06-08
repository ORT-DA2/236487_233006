import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from "@angular/router";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'page-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PageNotFoundComponent {}
