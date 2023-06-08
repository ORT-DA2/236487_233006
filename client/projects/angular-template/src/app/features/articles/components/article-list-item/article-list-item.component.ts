import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AvatarModule} from "primeng/avatar";
import {TruncatePipe} from "@core";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ArticleVisibilityDirective} from "@articles/utils/directives/article-visibility.directive";
import {ButtonModule} from "primeng/button";
import {Article, OffensiveWord} from "@shared/domain";
import {AgoPipe} from "@shared/pipes/ago.pipe";
import {HighlightDirective} from "@shared/highlight-directive";
import {Observable} from "rxjs";

@Component({
  selector: 'article-list-item',
  standalone: true,
  imports: [CommonModule, AvatarModule, TruncatePipe, RouterLink, ArticleVisibilityDirective, ButtonModule, RouterLinkActive, AgoPipe, HighlightDirective],
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListItemComponent {
  @Input() article !: Article;
  @Input() editing = false
  @Output() deleted = new EventEmitter<number>()
  @Input() showFromAuthor = true
  @Input() words$ !: Observable<OffensiveWord[]>
}
