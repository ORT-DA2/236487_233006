import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {articleQuery} from "@articles/+data-access/store/article/article.selectors";
import {authQuery} from "@auth/+data-access/store/auth.selectors";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {Field, FieldType, formsActions, FormState, LoadingModule, ngrxFormsQuery} from "@ui-components";
import {Store} from "@ngrx/store";
import {articleActions} from "@articles/+data-access/store/article/article.actions";
import {Article, User} from "@shared/domain";
import {AddCommentComponent} from "@articles/components/add-comment/add-comment.component";
import {userActions} from "@users/+data-access/store/user/user.actions";
import {tap} from "rxjs/operators";
import {userQuery} from "@users/+data-access/store/user/user.selectors";
import {UserHeaderComponent} from "@users/components/user-header/user-header.component";
import {ArticleHeaderComponent} from "@articles/components/article-header/article-header.component";
import {ArticleCommentComponent} from "@articles/components/article-comment/article-comment.component";
import {ArticleBodyComponent} from "@articles/components/article-body/article-body.component";
import {CommentsService} from "@articles/+data-access/services/comments.service";
import {wordsQuery} from "@users/+data-access/store/offensive-words/offensive-words.selectors";

interface ArticleVM {
  article: Article | null
  loading: boolean
  error: string | null
  loggedUser : User | null
  author : User | null
}

const structure: Field[] = [
  {
    type: FieldType.TEXTAREA,
    name: 'comment',
    placeholder: 'What are your thoughts?',
  },
];


@Component({
  selector: 'article-page',
  standalone: true,
  imports: [CommonModule, AddCommentComponent, LoadingModule, UserHeaderComponent, ArticleHeaderComponent, ArticleCommentComponent, ArticleBodyComponent],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ArticleComponent {
  
  showAddReply$ = this.commentsService.showAddReply$;
  
  private article$ = this.store.select(articleQuery.selectData).pipe(
    tap(a => {
      if (a && a.authorId) {
        this.store.dispatch(userActions.loadUser({ userId: a.authorId }));
      }
    })
  );
  
  words$ = this.store.select(wordsQuery.selectWords)
  
  private loading$ = this.store.select(articleQuery.selectLoading)
  private error$ = this.store.select(articleQuery.selectError)
  
  private author$ = this.store.select(userQuery.selectData);
  
  private loggedUser$ = this.store.select(authQuery.selectLoggedUser)
  
  vm$: Observable<ArticleVM> = combineLatest({
    article: this.article$,
    loading: this.loading$,
    error: this.error$,
    loggedUser : this.loggedUser$,
    author : this.author$
  })
  
  structure$ = this.store.select(ngrxFormsQuery.selectStructure);
  data$ = this.store.select(ngrxFormsQuery.selectData);
  
  constructor(private store: Store, private commentsService : CommentsService) {}
  
  ngOnInit() {
    this.store.dispatch(formsActions.setStructure({ structure }));
    this.store.dispatch(formsActions.setData({ data: '' }));
  }
  
  ngOnDestroy(): void {
    this.store.dispatch(articleActions.reset())
  }
  
  updateForm(state: FormState) {
    this.store.dispatch(formsActions.updateData({ state }))
  }
  
  submit(data: {articleId: number, authorId: number}) {
    const { articleId, authorId } = data;
    this.store.dispatch(articleActions.addComment({ articleId, authorId }));
  }
  
  onArticleApprove(articleId : number){
    this.store.dispatch(articleActions.approveArticle({articleId}))
  }
  
  onArticleReject(articleId : number){
    this.store.dispatch(articleActions.rejectArticle({articleId}))
  }
  
  onCommentApprove(commentId : number){
    this.store.dispatch(articleActions.approveArticleComment({commentId}))
  }
  
  onCommentReject(commentId : number){
    this.store.dispatch(articleActions.rejectArticleComment({commentId}))
  }
}
