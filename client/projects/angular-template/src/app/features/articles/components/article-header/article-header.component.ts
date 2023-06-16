import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Article, User} from "@shared/domain";
import {AvatarModule} from "primeng/avatar";
import {AgoPipe} from "@shared/pipes/ago.pipe";
import {getArticleStatus} from "@articles/utils/helpers/get-article-status";
import {ChipModule} from "primeng/chip";
import {RequiredRolesDirective} from "@auth/utils/dierctives/required-roles.directive";
import {RoleType} from "@core";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'article-header',
  standalone: true,
  imports: [CommonModule, AvatarModule, AgoPipe, ChipModule, RequiredRolesDirective, ButtonModule],
  templateUrl: './article-header.component.html',
  styleUrls: ['./article-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleHeaderComponent {
  @Input() article !: Article
  @Input() author : User | null = null
  
  @Input() canApproveReject  = false
  @Input() isLoggedUserAuthor = false
  
  @Output() articleApproved = new EventEmitter<number>()
  @Output() articleRejected = new EventEmitter<number>()
  
  roleType = RoleType
  
  get initials() : string{
    if(this.author){
      return this.author.firstName[0].toUpperCase() + this.author.lastName[0].toUpperCase()
    }
    return ""
  }
  
  get articleStatus(){
    return getArticleStatus(this.article)
  }
}
