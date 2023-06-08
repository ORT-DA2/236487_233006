import {ChangeDetectionStrategy, Component, Input} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MessagesModule} from 'primeng/messages'

@Component({
  selector: 'error-badge',
  standalone: true,
  imports: [CommonModule, MessagesModule],
  templateUrl: './error-badge.component.html',
  styleUrls: ['./error-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorBadgeComponent {
  @Input() error!: string
}
