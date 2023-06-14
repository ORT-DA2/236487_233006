import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {User} from "@shared/domain";
import {AvatarModule} from "primeng/avatar";

@Component({
  selector: 'user-header',
  standalone: true,
  imports: [CommonModule, AvatarModule],
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserHeaderComponent {
  @Input() user : User | null = null
  
  get initials() : string{
     if(this.user){
       return this.user.firstName[0].toUpperCase() + this.user.lastName[0].toUpperCase()
     }
     return ""
  }
}
