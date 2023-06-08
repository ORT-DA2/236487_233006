import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'access-denied',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink],
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AccessDeniedComponent {}
